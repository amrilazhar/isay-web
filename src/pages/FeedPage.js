import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusInterest, userActions } from "../redux/actions";
import { scrollToTop } from "../helpers/scrollToTop";
import Pagination from "@material-ui/lab/Pagination";

import Navbar from "../components/Navbar";
import FilterBox from "../components/FeedPage/FilterBox";
import WriteStatusBox from "../components/FeedPage/WriteStatusBox";
import FeedBox from "../components/FeedPage/FeedBox";
import Footer from "../components/Footer";
import FlashMessage from "../components/FlashMessage";
import "./style/FeedPage.css";
import socketIOClient from "socket.io-client";
import jwt_decode from "jwt-decode";
import { authHeader } from "../helpers";

const FeedPage = () => {
	const dispatch = useDispatch();

	const [oldStatus, setOldStatus] = useState(null);
	const [page, setPage] = useState(1);
	const [paramInterest, setParamInterest] = useState({
		param: "",
	});
	const interestUser = useSelector((state) => state?.users?.items);

	// socket param
	const [newFeedCount, setNewFeedCount] = useState(0);
	let tempCount = [];
	const socketRefFeed = useRef();
	const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";
	let token = authHeader().Authorization.replace("Bearer ", "");
	let decodedToken = jwt_decode(token);
	// End socket param

	const { param } = paramInterest;

	const clickPage = (event, value) => {
		setPage(value);
		setOldStatus(null);
		const page = value;
		dispatch(statusInterest.getStatus(param, page));
		dispatch(scrollToTop);
	};
	if (interestUser) {
	}
	useEffect(() => {
		dispatch(statusInterest.getStatus(param, page));
	}, []);

	useEffect(() => {
		dispatch(userActions.getActive());
	}, []);

	useEffect(() => {
		if (interestUser?.interest?.length > 0) {
			if (socketRefFeed.current === undefined) {
				socketRefFeed.current = socketIOClient(SOCKET_SERVER_URL, {
					transports: ["websocket"],
					path: "/socket",
					upgrade: false,
				});
				interestUser?.interest?.forEach((item, idx) => {
					socketRefFeed.current.removeAllListeners("post:" + item._id);
					socketRefFeed.current.on("post:" + item._id, (data) => {
						if (data.owner != decodedToken.profile) {
							tempCount[idx] =
								tempCount[idx] === undefined ? 1 : tempCount[idx] + 1;
							setNewFeedCount(tempCount[idx]);
						}
					});
				});

				return () => {
					socketRefFeed.current.disconnect();
				};
			}
		}
	}, [interestUser]);

	const statusUpdate = useSelector((state) => state?.statusInterest);
	const alert = useSelector((state) => state.alert);

	return (
		<>
			{alert.alert ? <FlashMessage /> : ""}
			<Navbar />
			<div className="feed-container">
				<div className="feed-wrapping">
					<FilterBox
						setParamInterest={setParamInterest}
						setPage={setPage}
						setOldStatus={setOldStatus}
					/>
					<div className="right-content">
						<div className="right-wrapping">
							<WriteStatusBox
								setPage={setPage}
								setOldStatus={setOldStatus}
								setParamInterest={setParamInterest}
							/>
							{` New Status FEEDD ${newFeedCount}`}
							<div className="realtime-feed">
								<FeedBox
									oldStatus={oldStatus}
									setOldStatus={setOldStatus}
									setPage={setPage}
								/>
								{statusUpdate?.loading ? (
									<div className="circle-box-load">
										<div className="circle-load"></div>
										<div className="circle-load"></div>
										<div className="circle-load"></div>
									</div>
								) : (
									<Pagination
										count={`${statusUpdate?.status?.totalPages}`}
										page={page}
										color="primary"
										className="pagination"
										onChange={clickPage}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default FeedPage;

import React from "react";
import "./style/leftSideMessage.css";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { formatRelative } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { getRoomListAct } from "../../redux/actions";
import jwt_decode from "jwt-decode";
import { authHeader } from "../../helpers";

const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";

const LeftSideMessage = () => {
	const dispatch = useDispatch();
	const socketRef = useRef();

	//get profile id from token
	let token = authHeader().Authorization.replace("Bearer ", "");
	let decodedToken = jwt_decode(token);

	const startServer = () => {
		if (socketRef.current === undefined) {
			// Creates a WebSocket connection

			socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
				transports: ["websocket"],
				path: "/socket",
				upgrade: false,
			});

			socketRef.current.removeAllListeners("chat:" + decodedToken.profile);
			// Listens for incoming messages
			socketRef.current.on(
				"chat:" + decodedToken.profile,
				changeMessageInRoomList
			);
		}
	};
	//get room ID
	const roomList = useSelector((state) => state.getRoomList);

	const displayMessageImageLink = (link) => {
		return <a href={link}>unknown image</a>;
	};

	const searchName = (event, value) => {
		let searchvalue = event.target.value;
		let allName = document.querySelectorAll(".search-room-list-name");
		allName.forEach((item) => {
			if (
				item.id
					.toString()
					.toLowerCase()
					.includes(searchvalue.toString().toLowerCase())
			) {
				item.classList.remove("hide-message-list");
			} else {
				item.classList.add("hide-message-list");
			}
		});
	};

	const changeMessageInRoomList = (dataMessage) => {
		let chatTime = document.querySelector(
			".room-list-created-at-" + dataMessage.chatRoom
		);
		let chatContent = document.querySelector(
			".room-list-message-" + dataMessage.chatRoom
		);
		if (chatContent !== null) {
			chatTime.innerHTML = formatRelative(
				new Date(dataMessage.created_at),
				new Date()
			);
			let dispName =
				dataMessage.from._id === decodedToken.profile
					? "You"
					: dataMessage.from.name;

			chatContent.innerHTML =
				dataMessage.message_type === "text"
					? `${dispName} : ${dataMessage.message.substring(0, 15)}${"..."}`
					: `${dispName} : ${displayMessageImageLink(dataMessage.message)}`;
		} else {
			dispatch(getRoomListAct());
		}
	};

	const displayRoomList = () => {
		if (!roomList.loading) {
			return roomList.roomList.map((item) => (
				<a
					href={`/message?to=${
						item.from._id === item.chatOwner ? item.to._id : item.from._id
					}`}
				>
					<div
						className="message-list search-room-list-name"
						id={
							item.from._id === item.chatOwner
								? "search-name" + item.to.name.replace(" ", "")
								: item.from.name.replace(" ", "")
						}
					>
						<div className="message-head">
							<div>
								<img
									src={
										item.from._id === item.chatOwner
											? item.to.avatar
											: item.from.avatar
									}
									alt="avatar"
								/>
							</div>
							<p>
								{item.from._id === item.chatOwner
									? item.to.name
									: item.from.name}
							</p>
							<p className={`room-list-created-at-${item.chatRoom}`}>
								{formatRelative(new Date(item.created_at), new Date())}
							</p>
						</div>
						<div className="message-peak">
							<p>
								<i className={`room-list-message-${item.chatRoom}`}>
									{item.from._id === item.chatOwner
										? "You : "
										: `${item.from.name} : `}
									{item.message_type === "text"
										? item.message.substring(0, 15) + "..."
										: displayMessageImageLink(item.message)}
								</i>
							</p>
						</div>
					</div>
				</a>
			));
		}
	};

	useEffect(() => {
		dispatch(getRoomListAct());
		startServer();
		return () => {
			socketRef.current.disconnect();
		};
	}, []);

	return (
		<>
		<div className="left-message-container">
			<div className="left-message-wrapper">
				<div className="search-meassage">
					<Input
						onChange={searchName}
						type="search"
						fullWidth={true}
						placeholder="search name..."
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
					/>
				</div>
				{displayRoomList()}
			</div>
		</div>
		</>
	);
};

export default LeftSideMessage;

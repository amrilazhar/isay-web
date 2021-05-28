import React from "react";
import "./style/leftSideMessage.css";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { formatRelative } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { getRoomListAct } from "../../redux/actions";

const LeftSideMessage = () => {
	const dispatch = useDispatch();

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

	const displayRoomList = () => {
		if (!roomList.loading) {
			return roomList.roomList.map((item) => (
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
							<img src={item.from.avatar} alt="avatar" />
						</div>
						<p>
							{item.from._id === item.chatOwner ? item.to.name : item.from.name}
						</p>
						<p>{formatRelative(new Date(item.created_at), new Date())}</p>
					</div>
					<div className="message-peak">
						<p>
							<i>
								{item.from._id === item.chatOwner
									? "You : "
									: `${item.from.name} : `}
								{item.message_type === "text"
									? item.message
									: displayMessageImageLink(item.message)}
							</i>
						</p>
					</div>
				</div>
			));
		}
	};

	useEffect(() => {
		dispatch(getRoomListAct());
	}, []);

	return (
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
	);
};

export default LeftSideMessage;

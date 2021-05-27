import "./style/mainContentMessage.css";
import Button from "@material-ui/core/Button";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SendIcon from "@material-ui/icons/Send";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import {
	getChatRoomAct,
	chatMessageAct,
	getOlderChatAct,
} from "../../redux/actions";
import { formatRelative } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { store } from "../../redux/store";
import { useLocation } from "react-router-dom";
import { chatConstant } from "../../redux/type";

import React from "react";
const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";
// const SOCKET_SERVER_URL = "http://localhost:3000";

const MainContentMessage = (props) => {
	const [newMessage, setNewMessage] = useState(""); // Message to be sent
	const [newImages, setNewImages] = useState([]); // Images to be sent
	const [loadMore, setLoadMore] = useState(false); // Images to be sent
	const [scrollPos, setScrollPos] = useState(""); // Images to be sent
	const [scrollActive, setScrollActive] = useState(true); // Images to be sent
	const [receiverOnlineStatus, setReceiverOnlineStatus] = useState(false);
	let lastMessage = "";
	const dispatch = useDispatch();

	//get room ID
	const room = useSelector((state) => state.getChatRoom);
	// get chat history
	const chatHistory = useSelector((state) => state.getChatHistory);
	//handle new message
	const chatMessage = useSelector((state) => state.setChatMessage.message);
	//handleOlderChat
	const olderChat = useSelector((state) => state.getOlderChat);

	const receiver = useLocation()
		.search.substring(1)
		.split("&")[0]
		.split("=")[1]; // receiverID

	// Sent and received messages
	const socketRef = useRef();

	//=========== Handle Scroll ===================
	const messagesEndRef = useRef(null);
	const messagesStartRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const scrollToTop = () => {
		messagesStartRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	//=========== END Handle Scroll ===================

	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleNewImagesChange = (event) => {
		let imgCont = [];
		let fileCont = event.target.files;
		for (const el of fileCont) {
			//rules for upload file less than 3MB and type image
			if (
				(el.type == "image/jpeg" ||
					el.type == "image/png" ||
					el.type == "image/gif" ||
					el.type == "image/bmp") &&
				el.size / (1024 * 1024) < 3
			) {
				encodeBase64(el, (image) => {
					imgCont.push(image);
				});
			}
		}
		setNewImages(imgCont);
	};

	const handleSendMessage = () => {
		if (newImages.length > 0) {
			sendImages(newImages);
			setNewImages([]);
			document.querySelector("#contained-button-file").files = null;
			document.querySelector("#contained-button-file").value = "";
		}
		if (newMessage !== "") {
			sendMessage(newMessage);
			setNewMessage("");
		}
	};

	const startServer = (room) => {
		if (socketRef.current === undefined) {
			if (room === "disconnect") {
				// Destroys the socket reference
				// when the connection is closed
				socketRef.current.disconnect();
			}
			// Creates a WebSocket connection

			socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
				transports: ["websocket"],
				path: "/socket",
				upgrade: false,
				query: { roomID: room },
			});
			socketRef.current.emit("connectAs", "im connected to room");

			// Listens for incoming messages
			socketRef.current.on(
				chatConstant.NEW_CHAT_MESSAGE_FROM_SERVER,
				(newMessage) => {
					//combine old message and new message
					dispatch(
						chatMessageAct([
							...store.getState().setChatMessage.message,
							newMessage,
						])
					);
				}
			);
			socketRef.current.on("online:" + receiver, (status) =>
				setReceiverOnlineStatus(status)
			);
			// Listens for update in read status of messages
			socketRef.current.on(
				chatConstant.UPDATED_READ_STATUS_MESSAGE_EVENT,
				(newMessageID) => {
					//set status message readed or not
					updateAllReadedStatus([newMessageID]);
				}
			);
		}
	};

	const sendMessage = (messageBody) => {
		setLoadMore(false);
		setScrollActive(true);
		socketRef.current.emit(chatConstant.NEW_CHAT_MESSAGE_EVENT, {
			content: messageBody,
			chatRoom: room.roomData._id,
			to: receiver,
			message_type: "text",
		});
	};

	//============== Handle Load Older Chat ======================
	const loadOlderChat = () => {
		let roomID = room.roomData._id;
		let getlastMessage =
			lastMessage === "" ? chatHistory.message[0]._id : lastMessage;
		setLoadMore(true);
		setScrollActive(false);
		setScrollPos(getlastMessage);
		dispatch(getOlderChatAct(roomID, getlastMessage, olderChat.message));
	};

	const printOlderChat = () => {
		if (!olderChat.loading && !chatHistory.loading) {
			lastMessage =
				olderChat.message.length > 0
					? olderChat.message[0]._id
					: chatHistory.message.length > 0
					? chatHistory.message[0]._id
					: "";
			return displayChatMessage(olderChat.message);
		}
	};
	//============== END Handle Load Older Chat ======================

	//=============== Handle Send Images ========================
	const encodeBase64 = (file, cb) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	const sendImages = (messageBody) => {
		setLoadMore(false);
		setScrollActive(true);
		messageBody.forEach((item, i) => {
			console.log("iterasi : ", i);
			socketRef.current.emit(chatConstant.NEW_CHAT_MESSAGE_EVENT, {
				content: item,
				chatRoom: room.roomData._id,
				to: receiver,
				message_type: "images",
			});
		});
	};
	//=============== END Handle Send Images ========================

	//============= Handle Read Status ============================
	const updateAllReadedStatus = (arr) => {
		arr.forEach((item) => {
			let readedStatus = document.querySelector(".readed-" + item);
			if (readedStatus) {
				readedStatus.classList.remove("MuiSvgIcon-colorDisabled");
				readedStatus.classList.add("MuiSvgIcon-colorPrimary");
			}
		});
	};

	const setReadStatus = (messageID) => {
		socketRef.current.emit(chatConstant.SET_READ_STATUS_MESSAGE_EVENT, {
			message_id: messageID,
		});
		// updateAllReadedStatus([messageID]);
	};
	//============= END Handle Read Status ========================

	//create display chat name
	const displayChatName = () => {
		if (!room.loading) {
			let name = "";
			let onlineStatus = false;
			room.roomData.member.forEach((item, i) => {
				if (item._id.toString() === receiver.toString()) {
					name = item.name;
					onlineStatus = Boolean(item.onlineStatus);
				}
			});

			return (
				<div className="main-message-head">
					<p>{name}</p>
					<p>
						{receiverOnlineStatus
							? "Online"
							: onlineStatus
							? "Online"
							: "Offline"}
					</p>
					<p>...</p>
				</div>
			);
		} else return "";
	};

	//create dsiplay load more button
	const displayLoadMoreButton = () => {
		if (!chatHistory.loading) {
			if (!chatHistory.lastChat) {
				return (
					<div className="btn-load-more">
						<button
							onClick={() => {
								loadOlderChat();
							}}
						>
							Load More
						</button>
					</div>
				);
			}
		}
		return "";
	};

	const displayChatMessage = (message) => {
		return message.map((item, i) => (
			<div className="each-message-public-wrapper">
				<div className="each-message-public-container">
					<div className="each-message-public-head">
						<div>
							<img src={item.from.avatar ? item.from.avatar : ''} alt="avatar" />
						</div>
						<p>
							{item.to._id.toString() === receiver.toString()
								? "You"
								: item.from.name}
						</p>
						<p>{formatRelative(new Date(item.created_at), new Date())}</p>
						{item.to._id === receiver ? (
							<p>
								<ChromeReaderModeIcon
									className={`readed-${item._id}`}
									// style={{ color: purple[400] }}
									color={item.readed ? "primary" : "disabled"}
									fontSize="medium"
								/>
							</p>
						) : (
							""
						)}
						{item.to._id === receiver
							? ""
							: !item.readed
							? setReadStatus(item._id)
							: ""}
					</div>
					<div className="each-message-public-content">
						{item.message_type == "image" ? (
							<img width="100%" src={item.message}></img>
						) : (
							item.message
						)}
						{/* set position for scroll after load more clicked */}
						{scrollPos == item._id ? <div ref={messagesStartRef} /> : ""}
					</div>
				</div>
			</div>
		));
	};

	useEffect(() => {
		if (receiver) {
			dispatch(getChatRoomAct(receiver));
			return () => {
				startServer("disconnect");
			};
		}
	}, []);

	useEffect(() => {
		if (loadMore && !scrollActive) {
			scrollToTop();
		}
		if (!loadMore && scrollActive) {
			scrollToBottom();
		}
	});

	if (!receiver) {
		return (
			<div className="main-message-container">
				<div className="main-message-wrapper">
					<div className="main-message-head">
						<p>Choose User</p>
						<p>Offline</p>
						<p>...</p>
					</div>
					<div className="empty-line"></div>

					<form className="textarea-wrapper" method="post">
						<textarea
							wrap="soft"
							type="text"
							name="message"
							id="message"
							placeholder="Write a message"
							defaultValue={""}
						/>
						<div className="message-btn">
							<div className="message-btn-upload">
								<input
									accept="image/*"
									id="contained-button-file"
									multiple
									type="file"
								/>
								<label htmlFor="contained-button-file">
									<Button
										className="img-button"
										variant="contained"
										component="span"
										startIcon={<ImageOutlinedIcon />}
									>
										Image
									</Button>
								</label>
							</div>
							<div className="message-btn-send">
								<Button endIcon={<SendIcon>send</SendIcon>}>Send</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	} else
		return (
			<div className="main-message-container">
				<div className="main-message-wrapper">
					{room.loading ? "" : startServer(room.roomData._id)}
					{displayChatName()}

					<div className="content-message-wrapper">
						{/* <div className="empty-line"></div> */}
						{displayLoadMoreButton()}

						{chatHistory.loading ? (
							"waiting history chat "
						) : chatHistory.message.length > 0 ? (
							""
						) : (
							<div className="empty-line"></div>
						)}

						{/* print isi load older chat */}
						{printOlderChat()}

						{/* display history message */}
						{chatHistory.loading
							? "waiting history chat "
							: displayChatMessage(chatHistory.message)}

						{/* display new message entered */}
						{displayChatMessage(chatMessage)}

						<div ref={messagesEndRef}></div>
					</div>
					<div className="chat-image-container">
						<div>{}</div>
					</div>
					<div className="textarea-wrapper">
						<textarea
							wrap="soft"
							type="text"
							name="message"
							id="message"
							placeholder="Write a message"
							defaultValue={""}
							value={newMessage}
							onChange={handleNewMessageChange}
						/>
						<div className="message-btn">
							<div className="message-btn-upload">
								<input
									accept="image/*"
									id="contained-button-file"
									multiple
									type="file"
									onChange={handleNewImagesChange}
								/>
								<label htmlFor="contained-button-file">
									<Button
										className="img-button"
										variant="contained"
										component="span"
										startIcon={<ImageOutlinedIcon />}
									>
										Image
									</Button>
								</label>
							</div>
							<div className="message-btn-send">
								<button
									onClick={handleSendMessage}
									endIcon={<SendIcon>send</SendIcon>}
								>
									Send
									{/* <img src={<SendIcon />} alt="icon" /> */}
									{/* <SendIcon style={{ marginLeft: "5px", fontSize: "1rem" }} /> */}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default MainContentMessage;

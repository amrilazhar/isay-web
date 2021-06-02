import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SmsIcon from "@material-ui/icons/Sms";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import "./style/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationCount } from "../redux/actions";
import { authHeader } from "../helpers";
import logoWhite from '../assets/isay-white.png';
import logoBlack from '../assets/isay-black.png';
import socketIOClient from "socket.io-client";
import jwt_decode from "jwt-decode";

const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";

const Navbar = () => {
	const dispatch = useDispatch();

	const [sideMenu, setSideMenu] = useState(false);
	const [newChatNotif, setNewChatNotif] = useState(0);
	const [newBasicNotif, setNewBasicNotif] = useState(0);
	const socketRefNav = useRef();
	let counterChat = 0;
	let counterNotif = 0;

	const handleSideMenu = () => setSideMenu(!sideMenu);

	const user = useSelector((state) => state?.users);
	const notificationCountUpdate = useSelector(
		(state) => state.notificationCount
	);

	const startServer = (action) => {
		if (socketRefNav.current === undefined) {
			// Creates a WebSocket connection
			let token = authHeader().Authorization.replace("Bearer ", "");
			let decodedToken = jwt_decode(token);

			socketRefNav.current = socketIOClient(SOCKET_SERVER_URL, {
				transports: ["websocket"],
				path: "/socket",
				upgrade: false,
			});
			// emit that user online
			socketRefNav.current.emit("online:"+decodedToken.profile, true);

			socketRefNav.current.on("chat:" + decodedToken.profile, (data) => {
				counterChat = counterChat + 1;
				setNewChatNotif(counterChat);
			});

			socketRefNav.current.on("readedChat:" + decodedToken.profile, (data) => {
				counterChat = counterChat - 1;
				setNewChatNotif(counterChat);
			});

			socketRefNav.current.on("notif:" + decodedToken.profile, (data) => {
				counterNotif = counterNotif + 1;
				setNewBasicNotif(counterNotif);
			});

			socketRefNav.current.on("readedNotif:" + decodedToken.profile, (data) => {
				counterNotif = counterNotif - 1;
				setNewBasicNotif(counterNotif);
			});
		} else {
			if (action === "disconnect") {
				socketRefNav.current.disconnect();
			}
		}
	};

	useEffect(() => {
		dispatch(notificationCount.getNotificationCount());
		startServer();
		// if (location.pathname === "/message") {
		// 	setNewChatNotif(0);
		// }
		return () => {
			startServer("disconnect");
		};
	}, []);

	const getInitialCountChat = () => {
		if (!notificationCountUpdate.loading) {
			return notificationCountUpdate.chatCount;
		} else return 0;
	};

	const getInitialCountNotif = () => {
		if (!notificationCountUpdate.loading) {
			return notificationCountUpdate.notifCount;
		} else return 0;
	};

	const theme = localStorage.getItem("theme");

	return (
		<Router>
			<div className="navbar-container">
				<div className="navbar-wrapper">
					<a href="/">
						<div className="nav-logo">
							{theme === "dark" ? (
								<img src={logoBlack} alt="logo"/>
							) : (
								<img src={logoWhite} alt="logo" />
							)}
						</div>
					</a>
					<div className="search">
						<input type="text" placeholder="#hashtag" />
					</div>
					<ul className={sideMenu ? "nav-menu active" : "nav-menu"}>
						<li className="nav-item">
							<a href="/">
								<div className="nav-links" activeClassName="active">
									<Badge badgeContent={0} color="error">
										<HomeIcon />
									</Badge>
									<p>Home</p>
								</div>
							</a>
						</li>
						<li className="nav-item">
							<a href="/notification">
								<div className="nav-links" activeClassName="active">
									<Badge
										badgeContent={getInitialCountNotif() + newBasicNotif}
										color="error"
									>
										<NotificationsIcon />
									</Badge>
									<p>Notifications</p>
								</div>
							</a>
						</li>
						<li className="nav-item">
							<a href="/message">
								<div className="nav-links" activeClassName="active">
									<Badge
										badgeContent={getInitialCountChat() + newChatNotif}
										color="error"
									>
										<SmsIcon />
									</Badge>
									<p>Message</p>
								</div>
							</a>
						</li>
					</ul>
					<a href="/profile">
						{!user?.items?.avatar ? (
							<div className="profile-icon-load">
								<img
									src="https://ik.imagekit.io/alfianpur/Final_Project/Grey_VyVyqnF1h1.png"
									alt="profile-icon"
								/>
							</div>
						) : (
							<div className="profile-icon">
								<img src={user?.items?.avatar} alt="profile-icon" />
							</div>
						)}
					</a>
					<div className="nav-icon" onClick={handleSideMenu}>
						{sideMenu ? (
							<CloseIcon />
						) : (
							<Badge
								badgeContent={
									getInitialCountChat() +
									newChatNotif +
									getInitialCountNotif() +
									newBasicNotif
								}
								color="error"
							>
								<MenuIcon />
							</Badge>
						)}
					</div>
				</div>
			</div>
		</Router>
	);
};

export default Navbar;

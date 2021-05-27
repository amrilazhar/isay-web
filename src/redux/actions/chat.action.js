import { chatConstant } from "../type";
import axios from "axios";
import { authHeader } from "../../helpers";

const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";
// const SOCKET_SERVER_URL = "http://localhost:3000";

export const getChatRoomAct = (receiver) => (dispatch) => {
	dispatch({
		type: chatConstant.GET_CHAT_ROOM_BEGIN,
		loading: true,
		error: null,
	});

	axios({
		method: "post",
		url: SOCKET_SERVER_URL + "/chat/joinRoom",
		headers: authHeader(),
		data: {
			to: receiver,
		},
	})
		.then((res) => {
			dispatch({
				type: chatConstant.GET_CHAT_ROOM_SUCCESS,
				loading: false,
				payload: res.data.data,
			});
			dispatch(getChatHistoryAct(res.data.data._id));
		})

		.catch((err) =>
			dispatch({
				type: chatConstant.GET_CHAT_ROOM_FAIL,
				loading: false,
				error: err,
			})
		);
};

export const getChatHistoryAct = (chatRoom) => (dispatch) => {
	dispatch({
		type: chatConstant.GET_CHAT_HISTORY_BEGIN,
		loading: true,
		error: null,
	});

	axios({
		method: "get",
		url: SOCKET_SERVER_URL + `/chat/messageHistory/${chatRoom}?limit=10`,
		headers: authHeader(),
	})
		.then((res) => {
			dispatch({
				type: chatConstant.GET_CHAT_HISTORY_SUCCESS,
				loading: false,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch({
				type: chatConstant.GET_CHAT_HISTORY_FAIL,
				loading: false,
				error: err,
			})
		);
};

export const getOlderChatAct =
	(chatRoom, lastMessage, olderMessage) => (dispatch) => {
		dispatch({
			type: chatConstant.GET_OLDER_CHAT_BEGIN,
			loading: true,
			error: null,
		});

		axios({
			method: "get",
			url:
				SOCKET_SERVER_URL +
				`/chat/loadMore?chatRoom=${chatRoom}&lastMessage=${lastMessage}&limit=2`,
			headers: authHeader(),
		})
			.then((res) => {
				dispatch({
					type: chatConstant.GET_OLDER_CHAT_SUCCESS,
					loading: false,
					payload: { new: res.data, old: olderMessage },
				});
			})

			.catch((err) =>
				dispatch({
					type: chatConstant.GET_OLDER_CHAT_FAIL,
					loading: false,
					error: err,
				})
			);
	};

export const chatMessageAct = (message) => (dispatch) => {
	dispatch({
		type: chatConstant.SET_CHAT_MESSAGE_BEGIN,
		loading: true,
		error: null,
	});
	dispatch({
		type: chatConstant.SET_CHAT_MESSAGE_SUCCESS,
		loading: false,
		payload: message,
	});
};

export const readedStatus = (messageID) => (dispatch) => {
	dispatch({
		type: chatConstant.READED_STATUS_MESSAGE_BEGIN,
		loading: true,
		error: null,
	});
	dispatch({
		type: chatConstant.READED_STATUS_MESSAGE_SUCCESS,
		loading: false,
		payload: messageID,
	});
};

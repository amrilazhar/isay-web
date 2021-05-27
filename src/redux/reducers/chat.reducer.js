import { chatConstant } from "../type";

const roomInitialState = {
	loading: true,
	error: null,
	roomData: null,
};

const chatHistoryInitialState = {
	loading: true,
	error: null,
	message: [],
    lastChat : true,
};

const chatOlderInitialState = {
	loading: false,
	error: null,
	message: [],
	lastChat: false,
};

const chatMessageInitialState = {
	loading: true,
	error: null,
	message: [],
};

const readedStatusInitialState = {
	loading: true,
	error: null,
	messageID: [],
};

export const getChatRoom = (state = roomInitialState, action) => {
	const { type, payload, error } = action;
	switch (type) {
		default:
			return {
				...state,
			};
		case chatConstant.GET_CHAT_ROOM_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case chatConstant.GET_CHAT_ROOM_SUCCESS:
			return {
				...state,
				loading: false,
				roomData: payload,
				error: null,
			};
		case chatConstant.GET_CHAT_ROOM_FAIL:
			return {
				...state,
				loading: false,
				error: error,
				roomData: null,
			};
	}
};

export const getChatHistory = (state = chatHistoryInitialState, action) => {
	const { type, payload, error } = action;
	switch (type) {
		default:
			return {
				...state,
			};
		case chatConstant.GET_CHAT_HISTORY_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case chatConstant.GET_CHAT_HISTORY_SUCCESS:
			return {
				...state,
				loading: false,
				message: payload.data,
                lastChat : payload.last,
				error: null,
			};
		case chatConstant.GET_CHAT_HISTORY_FAIL:
			return {
				...state,
				loading: false,
				error: error,
				message: [],
			};
	}
};

export const getOlderChat = (state = chatOlderInitialState, action) => {
	const { type, payload, error } = action;
	switch (type) {
		default:
			return {
				...state,
			};
		case chatConstant.GET_OLDER_CHAT_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case chatConstant.GET_OLDER_CHAT_SUCCESS:
			return {
				...state,
				loading: false,
				message: [...payload.new.data, ...payload.old],
				lastChat: payload.new.last,
				error: null,
			};
		case chatConstant.GET_OLDER_CHAT_FAIL:
			return {
				...state,
				loading: false,
				error: error,
				message: [],
			};
	}
};

export const setChatMessage = (state = chatMessageInitialState, action) => {
	const { type, payload, error } = action;
	switch (type) {
		default:
			return {
				...state,
			};
		case chatConstant.SET_CHAT_MESSAGE_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case chatConstant.SET_CHAT_MESSAGE_SUCCESS:
			return {
				...state,
				loading: false,
				message: payload,
				error: null,
			};
		case chatConstant.SET_CHAT_MESSAGE_FAIL:
			return {
				...state,
				loading: false,
				error: error,
				message: [],
			};
	}
};

export const setReadedStatus = (state = readedStatusInitialState, action) => {
	const { type, payload, error } = action;
	switch (type) {
		default:
			return {
				...state,
			};
		case chatConstant.READED_STATUS_MESSAGE_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case chatConstant.READED_STATUS_MESSAGE_SUCCESS:
			return {
				...state,
				loading: false,
				messageID: payload,
				error: null,
			};
		case chatConstant.READED_STATUS_MESSAGE_FAIL:
			return {
				...state,
				loading: false,
				error: error,
				messageID: [],
			};
	}
};

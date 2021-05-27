export const alertConstants = {
	SUCCESS: "ALERT_SUCCESS",
	ERROR: "ALERT_ERROR",
	CLEAR: "ALERT_CLEAR",
};

export const userConstants = {
	REGISTER_REQUEST: "USERS_REGISTER_REQUEST",
	REGISTER_SUCCESS: "USERS_REGISTER_SUCCESS",
	REGISTER_FAILURE: "USERS_REGISTER_FAILURE",

	LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
	LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
	LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

	LOGOUT: "USERS_LOGOUT",

	GETALL_REQUEST: "USERS_GETALL_REQUEST",
	GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
	GETALL_FAILURE: "USERS_GETALL_FAILURE",

	GETACTIVE_REQUEST: "USERS_GETACTIVE_REQUEST",
	GETACTIVE_SUCCESS: "USERS_GETACTIVE_SUCCESS",
	GETACTIVE_FAILURE: "USERS_GETACTIVE_FAILURE",

	DELETE_REQUEST: "USERS_DELETE_REQUEST",
	DELETE_SUCCESS: "USERS_DELETE_SUCCESS",
	DELETE_FAILURE: "USERS_DELETE_FAILURE",
};

export const statusConstant = {
	GET_STATUS_REQUEST: "GET_STATUS_REQUEST",
	GET_STATUS_SUCCESS: "GET_STATUS_SUCCESS",
	GET_STATUS_FAILURE: "GET_STATUS_FAILURE",
};

export const statusUserConstant = {
	GET_STATUS_USER_REQUEST: "GET_STATUS_USER_REQUEST",
	GET_STATUS_USER_SUCCESS: "GET_STATUS_USER_SUCCESS",
	GET_STATUS_USER_FAILURE: "GET_STATUS_USER_FAILURE",
};

export const inputInterestConstant = {
	GET_INPUT_INTEREST_REQUEST: "GET_INPUT_INTEREST_REQUEST",
	GET_INPUT_INTEREST_SUCCESS: "GET_INPUT_INTEREST_SUCCESS",
	GET_INPUT_INTEREST_FAILURE: "GET_INPUT_INTEREST_FAILURE",
};

export const inputActivityConstant = {
	GET_INPUT_ACTIVITY_REQUEST: "GET_INPUT_ACTIVITY_REQUEST",
	GET_INPUT_ACTIVITY_SUCCESS: "GET_INPUT_ACTIVITY_SUCCESS",
	GET_INPUT_ACTIVITY_FAILURE: "GET_INPUT_ACTIVITY_FAILURE",
};

export const inputLocationConstant = {
	GET_INPUT_LOCATION_REQUEST: "GET_INPUT_LOCATION_REQUEST",
	GET_INPUT_LOCATION_SUCCESS: "GET_INPUT_LOCATION_SUCCESS",
	GET_INPUT_LOCATION_FAILURE: "GET_INPUT_LOCATION_FAILURE",
};

export const getAvatarConstant = {
	GET_AVATAR_REQUEST: "GET_AVATAR_REQUEST",
	GET_AVATAR_SUCCESS: "GET_AVATAR_SUCCESS",
	GET_AVATAR_FAILURE: "GET_AVATAR_FAILURE",
};

export const chatConstant = {
	GET_CHAT_ROOM_BEGIN: "GET_CHAT_ROOM_BEGIN",
	GET_CHAT_ROOM_SUCCESS: "GET_CHAT_ROOM_SUCCESS",
	GET_CHAT_ROOM_FAIL: "GET_CHAT_ROOM_FAIL",
	GET_CHAT_HISTORY_BEGIN: "GET_CHAT_HISTORY_BEGIN",
	GET_CHAT_HISTORY_SUCCESS: "GET_CHAT_HISTORY_SUCCESS",
	GET_CHAT_HISTORY_FAIL: "GET_CHAT_HISTORY_FAIL",
	GET_OLDER_CHAT_BEGIN: "GET_OLDER_CHAT_BEGIN",
	GET_OLDER_CHAT_SUCCESS: "GET_OLDER_CHAT_SUCCESS",
	GET_OLDER_CHAT_FAIL: "GET_OLDER_CHAT_FAIL",
	SET_CHAT_MESSAGE_BEGIN: "SET_CHAT_MESSAGE_BEGIN",
	SET_CHAT_MESSAGE_SUCCESS: "SET_CHAT_MESSAGE_SUCCESS",
	SET_CHAT_MESSAGE_FAIL: "SET_CHAT_MESSAGE_FAIL",
	READED_STATUS_MESSAGE_BEGIN: "READED_STATUS_MESSAGE_BEGIN",
	READED_STATUS_MESSAGE_SUCCESS: "READED_STATUS_MESSAGE_SUCCESS",
	READED_STATUS_MESSAGE_FAIL: "READED_STATUS_MESSAGE_FAIL",
	NEW_CHAT_MESSAGE_EVENT: "newChatMessage",
	SET_READ_STATUS_MESSAGE_EVENT: "readMessage",
	UPDATED_READ_STATUS_MESSAGE_EVENT: "updatedReadMessage",
	NEW_CHAT_MESSAGE_FROM_SERVER: "messageFromServer",
	GET_ROOM_LIST_BEGIN : "GET_ROOM_LIST_BEGIN",
	GET_ROOM_LIST_SUCCESS : "GET_ROOM_LIST_SUCCESS",
	GET_ROOM_LIST_FAIL : "GET_ROOM_LIST_FAIL",
};

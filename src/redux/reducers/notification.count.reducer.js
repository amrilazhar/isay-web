import { notificationConstant } from "../type";

const notificationCountState = {
	loading: true,
	chatCount: 0,
	notifCount: 0,
	error: null,
};

export function notificationCount(state = notificationCountState, action) {
	switch (action.type) {
		case notificationConstant.NOTIFICATION_COUNT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case notificationConstant.NOTIFICATION_COUNT_SUCCESS:
			return {
				...state,
				chatCount: action.payload.chatCount,
				notifCount: action.payload.notifCount,
				loading: false,
			};
		case notificationConstant.NOTIFICATION_COUNT_FAILURE:
			return {
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}

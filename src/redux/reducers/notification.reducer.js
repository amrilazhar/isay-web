import { notificationConstant } from "../type";

const notificationState = {
    loading: true,
    notification: [],
    error: null
}

export function notificationData(state= notificationState, action) {
    switch(action.type) {
        case notificationConstant.NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case notificationConstant.NOTIFICATION_SUCCESS:
            return {
                ...state,
                notification: action.payload,
                loading: false
            };
        case notificationConstant.NOTIFICATION_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
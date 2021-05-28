import { otherUserActivityConstant } from "../type";

const otherUserActivityState = {
    loading: true,
    activity: [],
    error: null
}

export function otherUserActivity(state= otherUserActivityState, action) {
    switch(action.type) {
        case otherUserActivityConstant.OTHER_USER_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case otherUserActivityConstant.OTHER_USER_ACTIVITY_SUCCESS:
            return {
                ...state,
                activity: action.payload,
                loading: false
            };
        case otherUserActivityConstant.OTHER_USER_ACTIVITY_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
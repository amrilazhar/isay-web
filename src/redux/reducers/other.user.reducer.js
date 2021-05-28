import { otherUserConstant } from "../type";

export function otherUser(state = {}, action) {
    switch (action.type) {
        case otherUserConstant.OTHER_USER_REQUEST:
            return {
                loading: true,
                items: {}
            };
        case otherUserConstant.OTHER_USER_SUCCESS:
            return {
                loading: false,
                items: action.payload
            };
        case otherUserConstant.OTHER_USER_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
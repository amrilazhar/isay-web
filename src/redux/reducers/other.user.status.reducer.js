import { otherUserConstant } from '../type';

const otherUserStatusState = {
  loading: true,
  status: [],
  error: null
}

export function otherUserStatus (state = otherUserStatusState, action) {
  switch (action.type) {
    case otherUserConstant.OTHER_USER_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case otherUserConstant.OTHER_USER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: action.payload
      };
    case otherUserConstant.OTHER_USER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
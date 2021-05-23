import { statusUserConstant } from '../type';

const statusUserState = {
  loading: true,
  status: [],
  error: null
}

export function statusUser (state = statusUserState, action) {
  switch (action.type) {
    case statusUserConstant.GET_STATUS_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case statusUserConstant.GET_STATUS_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: action.payload
      };
    case statusUserConstant.GET_STATUS_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
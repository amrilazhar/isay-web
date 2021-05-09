import { statusConstant } from '../type';

const statusInterestState = {
  loading: true,
  status: [],
  error: null
}

export function statusInterest (state = statusInterestState, action) {
  switch (action.type) {
    case statusConstant.GET_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case statusConstant.GET_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: action.payload
      };
    case statusConstant.GET_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
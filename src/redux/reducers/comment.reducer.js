import { commentConstant } from '../type';

const commentState = {
  loading: true,
  comment: [],
  error: null
}

export function getComment (state = commentState, action) {
  switch (action.type) {
    case commentConstant.GET_COMMENT_REQUEST:
      return {
        // ...state,
        loading: true
      };
    case commentConstant.GET_COMMENT_SUCCESS:
      return {
        // ...state,
        loading: false,
        error: null,
        comment: action.payload
      };
    case commentConstant.GET_COMMENT_FAILURE:
      return {
        // ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
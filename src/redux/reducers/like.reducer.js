const likeState = {
    loading: true,
    like: [],
    error: null
}

export function like (state = likeState, action) {
  switch (action.type) {
    case "ADD_LIKE_REQUEST":
      return {
        loading: true
      };
    case "ADD_LIKE_SUCCESS":
      return {
        loading: false,
        error: null,
        like: action.payload
      };
    case "ADD_LIKE_FAILURE":
      return {
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
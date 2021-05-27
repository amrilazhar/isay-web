const listAvatarState = {
  loading: true,
  listAvatar: [],
  error: null
}

export function listAvatar (state = listAvatarState, action) {
  switch (action.type) {
    case "LIST_AVATAR_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "LIST_AVATAR_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        listAvatar: action.payload
      };
    case "LIST_AVATAR_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
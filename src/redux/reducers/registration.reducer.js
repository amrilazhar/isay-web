import { userConstants } from "../type";

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    case userConstants.REGISTER_GOOGLE_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_GOOGLE_SUCCESS:
      return {};
    case userConstants.REGISTER_GOOGLE_FAILURE:
      return {};
    default:
      return state;
  }
}

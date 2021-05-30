import axios from 'axios';
import { authHeader } from "../../helpers";

export const listAvatar = {
  listAvatarGet
};

function listAvatarGet() {
    return async dispatch => {
    dispatch(request());

    const requestOptions = {
        headers: authHeader()
    };

    try {
        const avatar = await axios.get(`https://isay.gabatch11.my.id/profile/avatarList`, requestOptions)
        dispatch(success(avatar))
    }
    catch(error){
        dispatch(failure(error.toString()))
        }
    };

    function request() { return { type: "LIST_AVATAR_REQUEST" } }
    function success(avatar) { return { type: "LIST_AVATAR_SUCCESS", payload: avatar.data.data } }
    function failure(error) { return { type: "LIST_AVATAR_FAILURE", error } }
}
import { otherUserConstant } from '../type';
import { alertActions } from './alert.actions'
import { authHeader } from "../../helpers";
import axios from "axios";

export function otherUser(userId) {

    return dispatch => {
        dispatch(request());

        const requestOptions = {
            headers: authHeader()
        };
    console.log("iniid", userId)
        return axios.get (`https://isay.gabatch11.my.id/profile/an/${userId}`, requestOptions)
            .then(
                users => {
                    dispatch(success(users))
                })
            .catch(
                error => {dispatch(failure(error.toString()))}
            );
    };

    function request() { return { type: otherUserConstant.OTHER_USER_REQUEST } }
    function success(users) { return { type: otherUserConstant.OTHER_USER_SUCCESS, payload: users.data.data } }
    function failure(error) { return { type: otherUserConstant.OTHER_USER_FAILURE, error } }
}
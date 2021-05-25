import { otherUserConstant } from '../type';
import { alertActions } from './alert.actions'
import { authHeader } from "../../helpers";
import axios from "axios";

export function otherUser(active) {
    return dispatch => {
        dispatch(request(active));

        const requestOptions = {
            headers: authHeader()
        };

        return axios.get (`https://isay.gabatch11.my.id/profile/an/60a7aed2285fba521debf652`, requestOptions)
            .then(
                users => {
                    dispatch(success(users))
                })
            .catch(
                error => {dispatch(failure(error.toString()))}
            );
    };

    function request(active) { return { type: otherUserConstant.OTHER_USER_REQUEST, active } }
    function success(users) { return { type: otherUserConstant.OTHER_USER_SUCCESS, payload: users.data.data } }
    function failure(error) { return { type: otherUserConstant.OTHER_USER_FAILURE, error } }
}
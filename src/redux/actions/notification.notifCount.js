import { notificationConstant } from "../type";
import axios from "axios";
import { authHeader } from "../../helpers";

export const notificationCount = {
    getNotificationCount,
}

function getNotificationCount (page, limit) {
    return dispatch => {
        dispatch(request())

        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        axios
        .get(`https://isay.gabatch11.my.id/notif/unreadNotif`, requestOptions)
        .then(response => {
            dispatch(success(response))
        })
        .catch(error =>{
            dispatch(failure(error))
        })
    }

    function request() {return {type:notificationConstant.NOTIFICATION_COUNT_REQUEST}}
    function success(response) {return {type: notificationConstant.NOTIFICATION_COUNT_SUCCESS, payload: response.data}}
    function failure(error) {return {type: notificationConstant.NOTIFICATION_COUNT_FAILURE, error}}
}
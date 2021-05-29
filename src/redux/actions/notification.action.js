import { notificationConstant } from "../type";
import axios from "axios";
import { authHeader } from "../../helpers";

export const notificationData = {
    getNotificationData,
}

function getNotificationData (page, limit) {
    return dispatch => {
        dispatch(request())

        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        axios
        .get(`https://isay.gabatch11.my.id/notif?page=${page}&limit=${limit}`, requestOptions)
        .then(response => {
            setTimeout(() =>{
                dispatch(success(response))
            }, 2500)
        })
        .catch(error =>{
            dispatch(failure(error))
        })
    }

    function request() {return {type:notificationConstant.NOTIFICATION_REQUEST}}
    function success(response) {return {type: notificationConstant.NOTIFICATION_SUCCESS, payload: response.data}}
    function failure(error) {return {type: notificationConstant.NOTIFICATION_FAILURE, error}}
}
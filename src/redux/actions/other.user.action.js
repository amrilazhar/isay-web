import { otherUserActivityConstant, otherUserConstant } from '../type';
import { alertActions } from './alert.actions'
import { authHeader } from "../../helpers";
import axios from "axios";

export const otherUser = {
    otherUserProfile,
    otherUserStatus,
    otherUserActivity,
};

function otherUserProfile(userId) {

    return dispatch => {
        dispatch(request());

        const requestOptions = {
            headers: authHeader()
        };

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

function otherUserStatus(userId, page) {
  return dispatch => {
    dispatch (request())

    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    axios
      .get (`https://isay.gabatch11.my.id/profile/an/Post/${userId}?page=${page}`, requestOptions)
      .then (response => {
        setTimeout(() => {
          dispatch(success(response))
        }, 2500)
      })
      .catch(error => {
        dispatch(failure(error))
      })
    }

  function request() {return {type: otherUserConstant.OTHER_USER_STATUS_REQUEST}};
  function success(response) {return {type: otherUserConstant.OTHER_USER_STATUS_SUCCESS, payload: response.data}}
  function failure(error) {return {type: otherUserConstant.OTHER_USER_STATUS_FAILURE, error}}
}

function otherUserActivity (userId) {
  return dispatch => {
    dispatch(request())

    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    axios
    .get(`https://isay.gabatch11.my.id/profile/an/Activities/${userId}`, requestOptions)
    .then(response => {
      setTimeout(() => {
        dispatch(success(response))
      }, 2500)
    })
    .catch(error => {
      dispatch(failure(error))
    })
  }  

  function request() {return {type: otherUserActivityConstant.OTHER_USER_ACTIVITY_REQUEST}};
  function success(response) {return {type:otherUserActivityConstant.OTHER_USER_ACTIVITY_SUCCESS, payload: response.data}}
  function failure(error) {return {type: otherUserActivityConstant.OTHER_USER_ACTIVITY_FAILURE, error}}
}
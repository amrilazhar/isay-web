import { statusConstant, statusUserConstant } from '../type';
import axios from 'axios';
import { authHeader } from "../../helpers";

export const statusInterest = {
  getStatus,
  getStatusUser
};

function getStatus(param, page) {
  return dispatch => {
    dispatch (request())

    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    axios
      .get (`https://isay.gabatch11.my.id/status/interest/${param}?page=${page}`, requestOptions)
      .then (response => {
        setTimeout(() => {
          dispatch(success(response))
        }, 2500)
      })
      .catch(error => {
        dispatch(failure(error))
      })
    }

  function request() {return {type: statusConstant.GET_STATUS_REQUEST}};
  function success(response) {return {type: statusConstant.GET_STATUS_SUCCESS, payload: response.data}}
  function failure(error) {return {type: statusConstant.GET_STATUS_FAILURE, error}}
}

function getStatusUser() {
  return dispatch => {
    dispatch (request())

    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    axios
      .get (`https://isay.gabatch11.my.id/status/users/`, requestOptions)
      .then (response => {
        setTimeout(() => {
          dispatch(success(response))
        }, 2500)
      })
      .catch(error => {
        dispatch(failure(error))
      })
    }

  function request() {return {type: statusUserConstant.GET_STATUS_USER_REQUEST}};
  function success(response) {return {type: statusUserConstant.GET_STATUS_USER_SUCCESS, payload: response.data}}
  function failure(error) {return {type: statusUserConstant.GET_STATUS_USER_FAILURE, error}}
}

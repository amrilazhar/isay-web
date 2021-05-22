import { statusConstant } from '../type';
// import { alertActions } from './alert.actions'
import axios from 'axios';
import { authHeader } from "../../helpers";

export const statusInterest = {
  getStatus
};

function getStatus(param) {
  return dispatch => {
    dispatch (request())

    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    console.log("diaction",param)

    axios
      .get (`https://isay.gabatch11.my.id/status/interest/${param}`, requestOptions)
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

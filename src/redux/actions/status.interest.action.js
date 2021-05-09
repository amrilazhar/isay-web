import { statusConstant } from '../type';
// import { alertActions } from './alert.actions'
import axios from 'axios';

export const statusInterest = {
  getStatus
};

function getStatus(status) {
  return dispatch => {
    dispatch (request(status))
    
    axios
      .get ("https://isay.gabatch11.my.id/status/interest/")
      .then (response => {
        setTimeout(() => {
          dispatch(success(response))
        }, 2500)
      })
      .catch(error => {
        dispatch(failure(error))
      })
    }

  function request(status) {return {type: statusConstant.GET_STATUS_REQUEST, status}};
  function success(response) {return {type: statusConstant.GET_STATUS_SUCCESS, payload: response.data}}
  function failure(error) {return {type: statusConstant.GET_STATUS_FAILURE, error}}
}

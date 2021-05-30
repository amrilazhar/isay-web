import { commentConstant } from '../type';
import axios from 'axios';
import { authHeader } from "../../helpers";

export const commentAction = {
  getComment
};

function getComment(statusId) {
  return async dispatch => {
    dispatch (request())

    const requestOptions = {
      headers: authHeader()
    };

    try {
      const response = await axios.get (`https://isay.gabatch11.my.id/comment?status_id=${statusId}`, requestOptions)
      dispatch(success(response))
    }
    catch(error){
        dispatch(failure(error))
      }
    }

  function request() {return {type: commentConstant.GET_COMMENT_REQUEST}};
  function success(response) {return {type: commentConstant.GET_COMMENT_SUCCESS, payload: response.data}}
  function failure(error) {return {type: commentConstant.GET_COMMENT_FAILURE, error}}
}
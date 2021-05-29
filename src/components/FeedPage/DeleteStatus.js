import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../helpers'

const DeleteStatus = (dariFeedBox) => {
  const statusId = dariFeedBox.statusId

  const dispatch = useDispatch()

  const deleteStatus = () => {

    dispatch (requestDelete());
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://isay.gabatch11.my.id/status/${statusId}`, requestOptions)
      .then(
        (response) => {dispatch(successDelete(response))},
        (error) => {dispatch(failureDelete(error.toString()))}
      )

    function requestDelete() {return {type: "DELETE_STATUS_REQUEST"}};
    function successDelete(response) {return {type: "DELETE_STATUS_SUCCESS", payload: response}}
    function failureDelete(error) {return {type: "DELETE_STATUS_FAILURE", error}}    
  }

  return (
    <button
      onClick={deleteStatus}
    >
      delete
    </button>
  )
}

export default DeleteStatus

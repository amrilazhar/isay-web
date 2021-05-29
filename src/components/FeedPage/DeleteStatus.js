import React from 'react'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../helpers'
import './style/DeleteStatus.css'

const DeleteStatus = (dariFeedBox) => {
  const statusId = dariFeedBox.statusId
  const ourId = dariFeedBox.ourId
  const statusOwnerId = dariFeedBox.statusOwnerId

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
    <div className="tooltip-wrapper">
      <div className="tooltip-delete">
        <div className="tooltip-circle-container">
          <div className="tooltip-circle-button"></div>
          <div className="tooltip-circle-button"></div>
          <div className="tooltip-circle-button"></div>
        </div>
        <div className="tooltip-content">
          <button>Share</button>
          {
            (ourId === statusOwnerId)?
            <button onClick={deleteStatus}>Delete</button>:
            <></>
          }
        </div>
      </div>
    </div>
  )
}

export default DeleteStatus

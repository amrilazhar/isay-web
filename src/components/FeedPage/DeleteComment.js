import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../helpers'
import { alertActions, statusInterest } from '../../redux/actions'
import './style/DeleteStatus.css'

const DeleteStatus = (dariFeedBox) => {
  const statusId = dariFeedBox.statusId
  const ourId = dariFeedBox.ourId
  const statusOwnerId = dariFeedBox.statusOwnerId
  const setOldStatus = dariFeedBox.setOldStatus
  const setPage = dariFeedBox.setPage

  const dispatch = useDispatch()

  const deleteStatus = () => {

    dispatch (requestDelete());
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://isay.gabatch11.my.id/status/${statusId}`, requestOptions)
      .then(
        (response) => {
          dispatch(successDelete(response))
          dispatch(alertActions.success('Successfully delete your status'));

          setOldStatus(null)
          setPage(1)
          const param = ""
          const pagin = 1
          setTimeout(() => {
            dispatch(statusInterest.getStatus(param, pagin))
          }, 2000)

          setTimeout(() => {
            const page = 1
            dispatch(statusInterest.getStatusUser(page))
          }, 2000)

          setTimeout(() => {
            setShowModalConfirm(false)
          }, 2000)
        },
        (error) => {dispatch(failureDelete(error.toString()))}
      )

    function requestDelete() {return {type: "DELETE_STATUS_REQUEST"}};
    function successDelete(response) {return {type: "DELETE_STATUS_SUCCESS", payload: response}}
    function failureDelete(error) {return {type: "DELETE_STATUS_FAILURE", error}}    
  }

  const [showModalConfirm, setShowModalConfirm] = useState(false)

  const showTheModal = () => {
    if(showModalConfirm === false) {
      setShowModalConfirm(true)
    } else {
      setShowModalConfirm(false)
    }
  }

  const modalConfirm = () => {
    if(showModalConfirm === false) {
      return (<div></div>)
    } else {
    return (
      <div id="resetModal" className="reset-modal">
        <div className="reset-modal-content">
          <button onClick={showTheModal} className="close">&times;</button>
          <div>
            <p>Are You Sure Want To Delete Your Status?</p>
            <div className="Confirm Button">
              <button onClick={showTheModal}>No</button>
              <button onClick={deleteStatus}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    )}
  }

  return (
    <>
    {modalConfirm()}
    <div className="tooltip-wrapper">
      <div className="tooltip-delete">
        <div className="tooltip-circle-container">
          <div className="tooltip-circle-button"></div>
          <div className="tooltip-circle-button"></div>
          <div className="tooltip-circle-button"></div>
        </div>
        <div className="tooltip-content">
          <button>Edit</button>
          {
            (ourId === statusOwnerId)?
            <button onClick={showTheModal}>Delete</button>:
            <></>
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default DeleteStatus

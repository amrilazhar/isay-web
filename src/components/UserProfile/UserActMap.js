import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../helpers'
import { alertActions } from '../../redux/actions'
import FlashMessage from '../FlashMessage'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const UserActMap = (fromAct) => {

  const userName = fromAct.userName
  const type = fromAct.type
  const ownerId = fromAct.ownerId
  const valueOfStatus = fromAct.valueOfStatus
  const interest = fromAct.interest
  const statusOwner = fromAct.statusOwner
  const avatar = fromAct.avatar
  const location = fromAct.location
  const content = fromAct.content
  const media = fromAct.media
  const likeLength = fromAct.likeLength
  const commentLength = fromAct.commentLength
  const actDate = fromAct.actDate
  const statusDate = fromAct.statusDate

  const [showLight, setShowLight] = useState(false)
  const [showMed, setShowMed] = useState("")

  const dispatch = useDispatch()
  const alert = useSelector ((state) => state.alert)

  const singleStatus = () =>{
    (valueOfStatus !== null)?
    history.replace(`./user/${ownerId}`):
    dispatch(alertActions.success('user not found, cause they are delete the message'));
  }

  return (
    <div className="isay-status-box">
      {
        alert.alert ? <FlashMessage/> : ""
      }
      <div className="header-activity">
        <div className="header-line-one">
          <div className="the-name">
          <p>{userName}</p>
          </div>
          <div className="campuran">
          <p>{type}</p>
            { valueOfStatus === null ?
              <></>
              :
              <div className="status-interest">
                <p>{interest}</p>
              </div>
            }
          </div>
        </div>
        <p>{actDate}</p>
      </div>
      <div onClick={singleStatus} style={{cursor: "pointer"}} className="isay-status-rec">
        { valueOfStatus !== null ?
          <>
            <div className="user-status">
              <div className="upper-prop">
                <div className="user-image">
                  <img src={avatar} alt="User" />
                </div>
                <div className="name-and-time">
                  <h2>{statusOwner}</h2>
                  <p>{statusDate}</p>
                </div>
                <div className="location">
                  <p><FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="1x" color="#4f4f4f"/>{location}</p>
                </div>
              </div>
              <div className="lower-prop">
                <p>{content}</p>
                <div className="image-post">
                {
                  (!media)? <div></div> :
                  (
                    media?.map(media =>(
                      <div className="image-cont">
                        <img src={`${media}`} alt={`${content}`} style={{cursor:"pointer"}} onClick={() =>
                          (showLight === false)? (setShowLight(true), setShowMed(media)) : setShowLight(false)
                        }/>
                        <div className="media-overlay" style={{cursor:"pointer"}}>
                          <p style={{fontSize: "1rem", cursor:"pointer"}}>preview</p>
                        </div>
                      </div>
                    ))
                  )
                }
                </div>
              </div>
            </div>
            {
              showLight === false ? "" :
              <Lightbox image={showMed} title={`${content}`} onClose={() =>
                (showLight === false)? setShowLight(true) : setShowLight(false)}></Lightbox>
            }
            <div className="do-at-status">
              <div className="button-collect">
                <div className="button">
                  <FontAwesomeIcon  icon={["far", "thumbs-up"]} size="1x" color="#4f4f4f"/>
                  <p>Like</p>
                  <p>{`( ${likeLength} )`}</p>
                </div>
                <div className="button">
                  <FontAwesomeIcon icon={["far", "comment"]} size="1x" color="#4f4f4f"/>
                  <p>Comments</p>
                  <p>{`( ${commentLength} )`}</p>
                </div>
                <div className="button">
                  <FontAwesomeIcon icon={["far", "comments"]} size="1x" color="#4f4f4f"/>
                  <p>Personal Chat</p>
                </div>
              </div>
            </div>
          </>:
          <p className="no-status-ava">Owner of this status has delete his status</p>
        }
      </div>
    </div>
  )
}

export default UserActMap

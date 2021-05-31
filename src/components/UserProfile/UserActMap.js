import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../helpers'
import { alertActions } from '../../redux/actions'
import FlashMessage from '../FlashMessage'

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
          <p>{userName}</p>
          <p>{type}</p>
          <div className="status-interest">
            <p>{interest}</p>
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
                    <>{
                      media?.map(media =>(
                        <div className="image-cont">
                          <img src={`${media}`} alt="PostMage" />
                        </div>
                      ))
                    }</>
                  }
                </div>
              </div>
            </div>
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

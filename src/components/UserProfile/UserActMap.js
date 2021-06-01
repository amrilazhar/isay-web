import React from 'react'
import { history } from '../../helpers'

const UserActMap = (fromAct) => {

  const userName = fromAct.userName
  const type = fromAct.type
  const ownerId = fromAct.ownerId
  const statusId = fromAct.statusId
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

  const singleStatus = () =>{
    history.replace(`./user/${ownerId}`)
  }

  return (
    <div className="isay-status-box">
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
              <p><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="Location" />{location}</p>
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
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
              <p>Like</p>
              <p>{`( ${likeLength} )`}</p>
            </div>
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
              <p>Comments</p>
              <p>{`( ${commentLength} )`}</p>
            </div>
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
              <p>Personal Chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserActMap

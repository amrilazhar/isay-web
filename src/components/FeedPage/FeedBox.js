import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatRelative } from 'date-fns'
import CommentBox from './CommentBox';
import './style/FeedBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { alertActions } from '../../redux/actions';
import { authHeader } from '../../helpers';
import DeleteStatus from './DeleteStatus';
import moment from 'moment';

const FeedBox = (fromFeedPage) => {

  const oldStatus = fromFeedPage?.oldStatus
  const statusUpdate = useSelector ((state) => state?.statusInterest)
  const users = useSelector ((state) => state?.users)
  const setOldStatus = fromFeedPage?.setOldStatus
  const setPage = fromFeedPage?.setPage

  const loadComponent = () => {
    return (
      <>
        <div className="isay-status-box">
          <div className="user-status">
            <div className="upper-prop">
              <div className="user-image-load">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
              </div>
              <div className="name-and-time-load">
              </div>
              <div className="status-interest-load"></div>
            </div>
            <div className="lower-prop-load"></div>
          </div>
          <div className="do-at-status-load"></div>
        </div>
      </>
    )
  }

  if (statusUpdate?.loading) {
    if(oldStatus === null) {
    return (
      <>
        {loadComponent()}
        {loadComponent()}
        {loadComponent()}
      </>
    )}
    return (
      <>
      {loadComponent()}
      {oldStatus?.map((user) => (
      <div className="isay-status-box">
        <div className="user-status">
          <DeleteStatus
            statusId={user?._id}
            ourId={users?.items?._id}
            statusOwnerId={user?.owner?._id}
            setOldStatus={setOldStatus}
            setPage={setPage}
          />
          <div className="upper-prop">
            <div className="user-image">
              <img src={user?.owner?.avatar} alt="User" />
            </div>
            <div className="name-and-time">
              <h2>{user?.owner?.name}</h2>
              <p>
                { (user?.created_at !== undefined)?
                  moment(new Date(user?.created_at)).fromNow():
                  user?.created_at
                }
              </p>
            </div>
            <div className="status-interest">
              <button value={`${user?.interest[0]?._id}`}>{user?.interest[0]?.interest}</button>
            </div>
            <div className="status-location">
              <p>
                <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="1x" color="#4f4f4f"/>
                {user?.owner?.location?.city}
              </p>
            </div>
          </div>
          <div className="lower-prop">
            <p>{user?.content}</p>
            <div className="image-post">
              {
                (!user?.media)? <div></div> :
                <>{
                  user?.media?.map(media =>(
                    <div className="image-cont">
                      <img src={`${media}`} alt="PostMage" />
                    </div>
                  ))
                }</>
              }
            </div>
          </div>
        </div>
        <CommentBox
          comment = {user?.comment}
          likeBy={user?.likeBy}
          statusId={user?._id}
          ownerId={user?.owner?._id}
        />
      </div>
      ))}
      </>
    )
  } else {
    if(statusUpdate?.status?.data === null) {
    return (
      <>
        <p>There are no people create status on your selected interest, be the first one to create it!</p>
      </>
    )}
    return (
        <>
        {statusUpdate?.status?.data?.map((user) => (
        <div className="isay-status-box">
          <div className="user-status">
            <DeleteStatus
              statusId={user?._id}
              ourId={users?.items?._id}
              statusOwnerId={user?.owner?._id}
              setOldStatus={setOldStatus}
              setPage={setPage}
            />
            <div className="upper-prop">
              <div className="user-image">
                <img src={user?.owner?.avatar} alt="User" />
              </div>
              <div className="name-and-time">
                <a href = { (users?.items?._id === user?.owner?.id)?`/profile`:`/user/${user?.owner?.id}`}>
                  <h2>{user?.owner?.name}</h2>
                </a>
                <p>
                  { (user?.created_at !== undefined)?
                    moment(new Date(user?.created_at)).fromNow():
                    user?.created_at
                  }
                </p>
              </div>
              <div className="status-interest">
                <button value={`${user?.interest[0]?._id}`}>{user?.interest[0]?.interest}</button>
              </div>
              <div className="status-location">
                <p>
                  <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="1x" color="#4f4f4f"/>
                  {user?.owner?.location?.city}
                </p>
              </div>
            </div>
            <div className="lower-prop">
              <p>{user?.content}</p>
              <div className="image-post">
                {
                  (!user?.media)? <div></div> :
                  <>{
                    user?.media?.map(media =>(
                      <div className="image-cont">
                        <img src={`${media}`} alt="PostMage" />
                      </div>
                    ))
                  }</>
                }
              </div>
            </div>
          </div>
          <CommentBox
            comment = {user?.comment}
            likeBy={user?.likeBy}
            statusId={user?._id}
            ownerId={user?.owner?._id}
          />
        </div>
        ))}
      </>
    )
  }
}

export default FeedBox

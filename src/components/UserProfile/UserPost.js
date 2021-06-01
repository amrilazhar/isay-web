import Pagination from '@material-ui/lab/Pagination';
import { formatRelative } from 'date-fns';
import moment from 'moment';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { scrollToTop } from '../../helpers/scrollToTop';
import { otherUser, statusInterest } from '../../redux/actions';
import CommentBox from '../FeedPage/CommentBox';
import DeleteStatus from '../FeedPage/DeleteStatus';
import './style/UserPost.css'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const UserPost = (dariUserPage) => {

  const dispatch = useDispatch()

  const {userId} = useParams()

  const post = dariUserPage.post.data
  const pageCount = dariUserPage.post.totalPages
  const [oldStatus, setOldStatus] =  useState(null)
  const [showLight, setShowLight] = useState(false)
  const [showMed, setShowMed] = useState("")

  const [page, setPage] = useState(1)

  const clickPage = (event, value) => {
    setPage(value)
    setOldStatus(null)
    const page = value
    dispatch(statusInterest.getStatusUser(page))
    dispatch(otherUser.otherUserStatus(userId, page))
    setTimeout(() => {
      dispatch(scrollToTop)
    }, 2500)
    
  }

  const users = useSelector ((state) => state?.users)

  return (
    <div className="realtime-feed-post">
      {(!post)?
        <div className="post-load"></div>
        :
        <> {post?.map( status =>
          <div className="isay-status-box">
            <div className="user-status">
              <DeleteStatus
                statusId={status?._id}
                ourId={users?.items?._id}
                statusOwnerId={status?.owner?._id}
                setOldStatus={setOldStatus}
                setPage={setPage}
              />
              <div className="upper-prop">
                <div className="name-and-time">
                  <h2>{status?.owner?.name}</h2>
                  <p>{moment(new Date(status?.created_at)).fromNow()}</p>
                </div>
                <div className="status-interest">
                  <p>{status?.interest[0]?.interest}</p>
                </div>
              </div>
              <div className="lower-prop">
                <p>{status?.content}</p>
                <div className="image-post">
                  {
                    (!status?.media)? <div></div> :
                    (
                      status?.media?.map(media =>(
                        <div className="image-cont">
                          <img src={`${media}`} alt={`${status?.content}`} style={{cursor:"pointer"}} onClick={() =>
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
              <Lightbox image={showMed} title={`${status?.content}`} onClose={() =>
                (showLight === false)? setShowLight(true) : setShowLight(false)}></Lightbox>
            }
            <CommentBox
              comment={status?.comment}
              likeBy={status?.likeBy}
              statusId={status?._id}
              ownerId={status?.owner?._id}
            />
          </div>)}
          <div style={{display: "flex", justifyContent:"center"}}>
            <Pagination
              count={`${pageCount}`}
              page={page}
              color="primary"
              className="pagination" 
              onChange={clickPage}
            />
          </div>
        </>
      }
    </div>
  )
}

export default UserPost

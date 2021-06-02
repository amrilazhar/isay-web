import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../redux/services/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { commentAction } from '../../redux/actions'
import CommentMap from './CommentMap'

const CommentBox = (fromFeedBox) => {

  const dispatch = useDispatch()

  const comment = fromFeedBox.comment
  const likeBy = fromFeedBox.likeBy
  const statusId = fromFeedBox.statusId
  const ownerId = fromFeedBox.ownerId

  const users = useSelector ((state) => state?.users)

  const [hadLike, setHadLike] = useState(0)
  const [likeValue, setLikeValue] = useState(0)
  const [commentLength, setCommentLength] = useState(0)

  useEffect (() => {
    setCommentLength(comment?.length)
  },[])

  useEffect (() => {
    const checkLike = likeBy.find((e) => e === users?.items?._id)
    return (checkLike === undefined)?
            setHadLike(0):
            setHadLike(1)
  },[])

  function statusLike() {
    if(hadLike === 1) {  
      dispatch (requestLike())
      setHadLike(0)
      setLikeValue(likeValue-1)
      userService.unlike(statusId)
        .then(
          message => dispatch(successLike(message)),
          error => dispatch(failureLike(error.toString()))
        )
        } else {
          dispatch (requestLike());
          setHadLike(1)
          setLikeValue(likeValue+1)
          userService.like(statusId)
          .then(
            (response) => {dispatch(successLike(response))},
            (error) => {dispatch(failureLike(error.toString()))}
        )
  }
    
    function requestLike() {return {type: "ADD_LIKE_REQUEST"}};
    function successLike(response) {return {type: "ADD_LIKE_SUCCESS", payload: response}}
    function failureLike(error) {return {type: "ADD_LIKE_FAILURE", error}}
  }

  const [show, setShow] = useState(false);
  
  const changeShow = () => {
    if (show === false) {
      setShow(true);
    }
    else if (show === true) {
      setShow(false);
    }
  }
  
  return (
    <div className="do-at-status">
      <div className="button-collect">
        <div className="button" onClick={statusLike}>
          {
            (hadLike === 1)?
            <FontAwesomeIcon  icon={["fas", "thumbs-up"]} size="1x" color="#8a62fb"/>:
            <FontAwesomeIcon  icon={["far", "thumbs-up"]} size="1x" color="#4f4f4f"/>
          }
          <p>Like</p>
            <p>{`( ${likeBy?.length+likeValue} )`}</p>
        </div>
        <div className="button" onClick={changeShow}>
          {
            (show === false)?
            <FontAwesomeIcon icon={["far", "comment"]} size="1x" color="#4f4f4f"/>:
            <FontAwesomeIcon icon={["fas", "comment"]} size="1x" color="#8a62fb"/>

          }
          <p>Comments</p>
          <p>{`( ${commentLength} )`}</p>
        </div>
        { (users?.items?._id === ownerId)?
          <div></div>:
          <div className="button">
            <FontAwesomeIcon icon={["far", "comments"]} size="1x" color="#4f4f4f"/>
            <a href ={`/message?to=${ownerId}`}>
              <p className="personal-text">Personal Chat</p>
            </a>
          </div>
        }
      </div>
      {
        (show === true)?
          <CommentMap
            show={show}
            statusId={statusId}
            commentLength={commentLength}
            setCommentLength={setCommentLength}
          />:
          <div></div>
      }
    </div>
  )
}

export default CommentBox

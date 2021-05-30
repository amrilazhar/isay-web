import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../helpers'
import { commentAction } from '../../redux/actions'
import { commentConstant } from '../../redux/type'

const CommentMap = (fromCommentBox) => {

  const dispatch = useDispatch()

  const show = fromCommentBox.show
  const statusId = fromCommentBox.statusId
  const commentLength = fromCommentBox.commentLength

  const [myComment, setMyComment] =  useState("")

  useEffect(() => {
    dispatch(
      async dispatch => {
        dispatch ({type: commentConstant.GET_COMMENT_REQUEST})

        const requestOptions = {
          headers: authHeader()
        };

        try {
          const response = await axios.get (`https://isay.gabatch11.my.id/comment?status_id=${statusId}`, requestOptions)
          dispatch({type: commentConstant.GET_COMMENT_SUCCESS, payload: response.data})
          setMyComment(response.data)
        }
        catch(error){
            dispatch({type: commentConstant.GET_COMMENT_FAILURE, error})
          }
      }
    )
  },[show])

  const displayComment = () => {
    let arrComment = []

    for (const comment in myComment?.data?.comments) {
      arrComment.push(
        <div className="comment-box">
          <div className="comment-detail">
            <h2>{myComment?.data?.comments[comment]?.owner?.name}</h2>
            <p>3h ago</p>
          </div>
          <div className="comment-content">
            <p>{myComment?.data?.comments[comment]?.content}</p>
          </div>
        </div>
      )
    }

    let arrDisplay = arrComment.slice(0,2)

    return arrDisplay
  }

  return (
    (commentLength === 0)? 
    <div className="comment-expand">
      <form action method="post">
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about me?" defaultValue={""} />
      </form>
      <p>BE THE FIRST ONE WHO GIVE A COMMENT</p>
    </div>
    :
    <div className="comment-expand">
      <form action method="post">
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about me?" defaultValue={""} />
      </form>
      {displayComment()}
      {
        (commentLength > 2)?
        <p>Display More Comment</p>:
        <div></div>
      }
    </div>
  )
}

export default CommentMap

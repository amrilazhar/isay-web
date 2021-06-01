import axios from 'axios'
import moment from 'moment'
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
  const setCommentLength = fromCommentBox.setCommentLength

  const [myComment, setMyComment] =  useState("")
  const [newComment, setNewComment] = useState(false)

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
          setCommentLength(response.data?.data?.count)
        }
        catch(error){
            dispatch({type: commentConstant.GET_COMMENT_FAILURE, error})
          }
      }
    )
    setNewComment(false)
  },[show, newComment])

  const [lastComment, setLastComment] = useState(0)

  const displayComment = () => {
    let arrComment = []

    for (const comment in myComment?.data?.comments) {
      arrComment.push(
        <div className="comment-box">
          <div className="comment-detail">
            <h2>{myComment?.data?.comments[comment]?.owner?.name}</h2>
            <p>{moment(new Date(myComment?.data?.comments[comment]?.created_at)).fromNow()}</p>
          </div>
          <div className="comment-content">
            <p>{myComment?.data?.comments[comment]?.content}</p>
          </div>
        </div>
      )
    }

    let arrDisplay = arrComment.slice(0,lastComment+2)

    return arrDisplay
  }

  
  const [contentComment, setContentComment] = useState("")

  const changeText = (e) => {
    setContentComment(e?.target?.value)
  }

  const submitComment = (e) => {
    if(e.keyCode === 13 && !e.shiftKey && contentComment) {
      e.preventDefault()
      dispatch(
        dispatch => {
          dispatch ({type: commentConstant.POST_COMMENT_REQUEST})

          const formData = new FormData();
          formData.append('content', `${contentComment}`);
          formData.append('status_id', `${statusId}`);

          const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: formData
          };

          fetch (`https://isay.gabatch11.my.id/comment/`, requestOptions)

          .then (
              content => dispatch({ type: commentConstant.POST_COMMENT_SUCCESS, content }),
              error => dispatch({ type: commentConstant.POST_COMMENT_FAILURE, error })
          );
        }
      )
      setTimeout(() => {
        setNewComment(true)
      }, 2500)
      e.target.value=""
    }
  }

    const submitCommentBtn = (e) => {
    e.preventDefault()
    if(contentComment) {
      dispatch(
        dispatch => {
          dispatch ({type: commentConstant.POST_COMMENT_REQUEST})

          const formData = new FormData();
          formData.append('content', `${contentComment}`);
          formData.append('status_id', `${statusId}`);

          const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: formData
          };

          fetch (`https://isay.gabatch11.my.id/comment/`, requestOptions)

          .then (
              content => dispatch({ type: commentConstant.POST_COMMENT_SUCCESS, content }),
              error => dispatch({ type: commentConstant.POST_COMMENT_FAILURE, error })
          );
        }
      )
      setTimeout(() => {
        setNewComment(true)
      }, 2500)
      e.target.reset()
    }
  }

  return (
    <div className="comment-expand">
      <form onSubmit={submitCommentBtn}>
        <textarea
          wrap="soft"
          type="text"
          name="comment"
          id="comment"
          placeholder="What do you feel about me?"
          defaultValue={""}
          onChange={changeText}
          onKeyDown={(e) => submitComment(e) }
        />
        <input type="submit" value="Post"></input>
      </form>
      { (commentLength === 0)? 
          <p className="zero-comment">BE THE FIRST ONE WHO GIVE A COMMENT</p>:
        <> {displayComment()}
        {
          (commentLength > 2 && lastComment < commentLength-1 )?
          <div className="display-more-container">
            <div className="display-comment-more">
              <p className="display-more" onClick={() => {setLastComment(lastComment+2)}}>Display More Comment</p>
            </div>
          </div>:
          <div></div>
        } </>
      }
    </div>
  )
}

export default CommentMap

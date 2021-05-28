import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../redux/services/user.service'

const CommentBox = (fromFeedBox) => {

  const dispatch = useDispatch()

  const comment = fromFeedBox.comment
  const likeBy = fromFeedBox.likeBy
  const statusId = fromFeedBox.statusId
  const ownerId = fromFeedBox.ownerId

  const newLike = likeBy.length + 1

  console.log("newLike nih", newLike)

  const [theCondition, setTheCondition] = useState(null)
  const [show, setShow] = useState(false);

  const conditionalLike = useSelector((state) => state.like)

  const changeShow = () => {
    if (show === false) {
      setShow(true);
    }
    else if (show === true) {
      setShow(false);
    }
  }

  function statusLike() {
  
    if(theCondition == `You can't like status twice`) {  
      dispatch (requestLike())
      setTheCondition(null)
      userService.unlike(statusId)
        .then(
          message => dispatch(successLike(message)),
          error => dispatch(failureLike(error.toString()))
        )
        } else {
          dispatch (requestLike());
          setTheCondition(`You can't like status twice`)
          userService.like(statusId)
          .then(
            (response) => {dispatch(successLike(response))},
            (error) => {dispatch(failureLike(error.toString()))}
    )}

    function requestLike() {return {type: "ADD_LIKE_REQUEST"}};
    function successLike(response) {return {type: "ADD_LIKE_SUCCESS", payload: response}}
    function failureLike(error) {return {type: "ADD_LIKE_FAILURE", error}}
  }

  const commentExpand = () => {
    if (show === true){
      return (
        <div className="comment-expand">
          <form action method="post">
            <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about me?" defaultValue={""} />
          </form>
          <div className="comment-box">
            <div className="comment-detail">
              <h2>Rafflesia Arnoldi</h2>
              <p>3h ago</p>
            </div>
            <div className="comment-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam nobis alias natus nam dignissimos, recusandae quasi aspernatur maxime similique molestiae aut magni eius voluptates modi hic suscipit incidunt quae.</p>
            </div>
          </div>
          <div className="comment-box">
            <div className="comment-detail">
              <h2>Rafflesia Arnoldi</h2>
              <p>3h ago</p>
            </div>
            <div className="comment-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam nobis alias natus nam dignissimos,
                recusandae quasi aspernatur maxime similique molestiae aut magni eius voluptates modi hic suscipit incidunt quae.
              </p>
            </div>
          </div>
        </div>
      )
    } return (<div></div>)
  }

  const users = useSelector ((state) => state?.users)

  return (
    <div className="do-at-status">
      <div className="button-collect">
        <div className="button" onClick={statusLike}>
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
          <p>Like</p>
          <p>{`( ${likeBy?.length} )`}</p>
        </div>
        <div className="button" onClick={changeShow}>
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
          <p>Comments</p>
          <p>{`( ${comment?.length} )`}</p>
        </div>
        { (users?.items?._id === ownerId)?
          <div></div>:
          <div className="button">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
            <a href ={`/message?to=${ownerId}`}>
              <p>Personal Chat</p>
            </a>
          </div>
        }
      </div>
      {commentExpand()}
    </div>
  )

}

export default CommentBox

import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../helpers'

const CommentBox = (fromFeedBox) => {

  const dispatch = useDispatch()

  const comment = fromFeedBox.comment
  const likeBy = fromFeedBox.likeBy
  const statusId = fromFeedBox.statusId

  const [show, setShow] = useState(false);

  const changeShow = () => {
    if (show === false) {
      setShow(true);
    }
    else if (show === true) {
      setShow(false);
    }
  }

  function statusLike() {
      console.log(statusId)
      dispatch (request())

      const requestOptions = {
          method: 'PUT',
          headers: authHeader()
      };

      fetch(`https://isay.gabatch11.my.id/status/like/${statusId}`, requestOptions)
        .then(
          message => dispatch(success(message)),
          error => dispatch(failure(error.toString()))
    );

    function request() {return {type: "ADD_LIKE_REQUEST"}};
    function success(message) {return {type: "ADD_LIKE_SUCCESS", payload: message}}
    function failure(error) {return {type: "ADD_LIKE_FAILURE", error}}
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
        <div className="button">
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
          <p>Personal Chat</p>
        </div>
      </div>
      {commentExpand()}
    </div>
  )

}

export default CommentBox

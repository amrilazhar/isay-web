import React, { useState } from 'react'

const CommentBox = () => {

  const [show, setShow] = useState(false);

  const changeShow = () => {
    if (show === false) {
      setShow(true);
    }
    else if (show === true) {
      setShow(false);
    }
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
        <div className="button">
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
          <p>Like</p>
          <p>12</p>
        </div>
        <div className="button" onClick={changeShow}>
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
          <p>Comments</p>
          <p>10</p>
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

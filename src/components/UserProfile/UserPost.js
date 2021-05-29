import { formatRelative } from 'date-fns';
import React, { useState } from 'react'
import CommentBox from '../FeedPage/CommentBox';
import './style/UserPost.css'

const UserPost = (dariUserPage) => {

  const post = dariUserPage.post.data

  const [show, setShow] =  useState(false);

  const changeShow = () => {
    if (show === false) {
      setShow(true);
    }
    else if (show === true) {
      setShow(false);
    }
  }

  const CommentExpand = () => {
    if (show === true) {
      return (
        <div className="comment-expand">
          {/* <form action method="post">
            <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about me?" defaultValue={""} />
          </form> */}
          <div className="comment-box">
            <div className="comment-detail">
              <h2>Rafflesia Arnoldi</h2>
              <p>3h ago</p>
            </div>
            <div className="comment-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam nobis alias natus nam
                dignissimos, recusandae quasi aspernatur maxime similique molestiae aut magni eius voluptates modi hic
                suscipit incidunt quae.</p>
            </div>
          </div>
          <div className="comment-box">
            <div className="comment-detail">
              <h2>Rafflesia Arnoldi</h2>
              <p>3h ago</p>
            </div>
            <div className="comment-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam nobis alias natus nam
                dignissimos,
                recusandae quasi aspernatur maxime similique molestiae aut magni eius voluptates modi hic suscipit
                incidunt quae.
              </p>
            </div>
          </div>
        </div>
      )
    } else {return (<div></div>)}
  }

  return (
    <div className="realtime-feed-post">
      {/* Start */}
      {(!post)?
        <div className="post-load"></div>
        :
        <> {post?.map( status =>
          <div className="isay-status-box">
            <div className="user-status">
              <div className="upper-prop">
                <div className="name-and-time">
                  <h2>{status?.owner?.name}</h2>
                  <p>{formatRelative(new Date(status?.created_at), new Date())}</p>
                </div>
                <div className="status-interest">
                  <p>{status?.interest[0]?.interest}</p>
                </div>
              </div>
              <div className="lower-prop">
                <p>{status?.content}</p>
              </div>
            </div>
            <CommentBox
              comment={status?.comment}
              likeBy={status?.likeBy}
              statusId={status?._id}
              ownerId={status?.owner?._id}
            />
          </div>)}
        </>
      }
      {/* End */}
      <div className="pagination" />
    </div>
  )
}

export default UserPost

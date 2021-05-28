import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../redux/services/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CommentBox = (fromFeedBox) => {

  const dispatch = useDispatch()

  const comment = fromFeedBox.comment
  const likeBy = fromFeedBox.likeBy
  const statusId = fromFeedBox.statusId
  const ownerId = fromFeedBox.ownerId

  console.log("comment", comment)

  const users = useSelector ((state) => state?.users)

  const [hadLike, setHadLike] = useState(0)

  useEffect (() => {
    const checkLike = likeBy.find((e) => e === users?.items?._id)
    return (checkLike === undefined)?
    setHadLike(0):setHadLike(1)
  },[])

    function statusLike() {
    if(hadLike === 1) {  
      dispatch (requestLike())
      setHadLike(0)
      userService.unlike(statusId)
        .then(
          message => dispatch(successLike(message)),
          error => dispatch(failureLike(error.toString()))
        )
        } else {
          dispatch (requestLike());
          setHadLike(1)
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
          {
            (hadLike === 1)?
            <FontAwesomeIcon  icon={["fas", "thumbs-up"]} size="1x" color="#4f4f4f"/>:
            <FontAwesomeIcon  icon={["far", "thumbs-up"]} size="1x" color="#4f4f4f"/>
          }
          <p>Like</p>
          <p>{`( ${likeBy?.length+hadLike} )`}</p>
        </div>
        <div className="button" onClick={changeShow}>
          <FontAwesomeIcon icon={["far", "comment"]} size="1x" color="#4f4f4f"/>
          <p>Comments</p>
          <p>{`( ${comment?.length} )`}</p>
        </div>
        { (users?.items?._id === ownerId)?
          <div></div>:
          <div className="button">
            <FontAwesomeIcon icon={["far", "comments"]} size="1x" color="#4f4f4f"/>
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

import React from 'react'

const UserPost = () => {
  return (
    <div className="realtime-feed-post">
      <div className="isay-status-box">
        <div className="user-status">
          <div className="upper-prop">
            <div className="name-and-time">
              <h2>Raflesia Arnoldi</h2>
              <p>1 hour ago</p>
            </div>
            <div className="status-interest">
              <p>Personal</p>
            </div>
          </div>
          <div className="lower-prop">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eaque officia eligendi, distinctio
              perferendis odio minima dignissimos adipisci error nam, non libero quae quod, ipsum praesentium dolore
              consectetur quas aliquam?</p>
          </div>
        </div>
        <div className="do-at-status">
          <div className="button-collect">
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
              <p>Like</p>
              <p>(3)</p>
            </div>
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
              <p>Comments</p>
              <p>(15)</p>
            </div>
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
              <p>Personal Chat</p>
            </div>
          </div>
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
        </div>
      </div>
      <div className="isay-status-box">
        <div className="user-status">
          <div className="upper-prop">
            <div className="name-and-time">
              <h2>Raflesia Arnoldi</h2>
              <p>1 hour ago</p>
            </div>
            <div className="status-interest">
              <p>Personal</p>
            </div>
          </div>
          <div className="lower-prop">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eaque officia eligendi, distinctio
              perferendis odio minima dignissimos adipisci error nam, non libero quae quod, ipsum praesentium dolore
              consectetur quas aliquam?</p>
            <div className="image-post">
              <div className="image-cont">
                <img src="https://ik.imagekit.io/alfianpur/Personal_Pages/design_fP0B76kJ-16.jpg" alt="PostMage" />
              </div>
              <div className="image-cont">
                <img src="https://ik.imagekit.io/alfianpur/Personal_Pages/design_fP0B76kJ-16.jpg" alt="PostMage" />
              </div>
            </div>
          </div>
        </div>
        <div className="do-at-status">
          <div className="button-collect">
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
              <p>Like</p>
              <p>(3)</p>
            </div>
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
              <p>Comments</p>
              <p>(15)</p>
            </div>
            <div className="button">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
              <p>Personal Chat</p>
            </div>
          </div>
          <div className="comments-expand">
          </div>
        </div>
      </div>
      <div className="pagination" />
    </div>
  )
}

export default UserPost

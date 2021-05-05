import React from 'react'
import './style/UserBio.css'

const UserBio = () => {
  return (
    <div className="profile-sizing">
      <div className="bio">
        <h2>Bio</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, cumque. Consequatur explicabo accusantium ex ullam quia magnam autem qui eveniet adipisci nemo quaerat repellendus nam voluptatibus voluptates, minima temporibus rerum! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam ullam corrupti perferendis incidunt unde harum aliquam dolorem enim, optio repellendus sequi asperiores quos error autem veritatis ex facere quod. Esse.</p>
      </div>
      <div className="interest">
        <h2>Interest Topic</h2>
        <div className="interest-list">
          <button>Personal</button>
          <button>Politics</button>
          <button>Sports</button>
          <button>Tech</button>
          <button>Psychology</button>
          <button>Design</button>
        </div>
      </div>
    </div>
  )
}

export default UserBio

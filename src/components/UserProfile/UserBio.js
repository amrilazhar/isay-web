import React from 'react'
import './style/UserBio.css'

const UserBio = (props) => {

  const bio = props.bio

  console.log( "apa", bio.interest)

  return (
    <div className="profile-sizing">
      <div className="bio">
        <h2>Bio</h2>
        <p>{bio.bio}</p>
      </div>
      <div className="interest">
        <h2>Interest Topic</h2>
        <div className="interest-list">
          {bio.interest[0].map( interest =>
          <button>{interest.interest}</button>            
          )}
        </div>
      </div>
    </div>
  )
}

export default UserBio

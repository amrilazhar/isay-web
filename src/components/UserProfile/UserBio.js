import React from 'react'
import { Link } from 'react-router-dom'
import './style/UserBio.css'

const UserBio = (dariUserPage) => {

  const bio = dariUserPage.bio

  if (!bio){
      return (
        <div>cannot find</div>
      ) 
    } else {
      return (
        <div className="profile-sizing">
          <div className="bio">
            <h2>Bio</h2>
            {(!bio.bio) ? <div className="bio-load"></div> :
              <p>{bio?.bio}</p>
            }
          </div>
          <div className="interest">
            <h2>Interest Topic</h2>
            <Link>
              <div className="interest-list">
                {(bio?.interest[0]) ?
                <div>{bio?.interest[0]?.map( interest =>
                <button>{interest?.interest}</button>
                )}</div> :
                <div className="bio-interest-load">
                  <div className="bio-interest-load-content"></div>
                  <div className="bio-interest-load-content"></div>
                  <div className="bio-interest-load-content"></div>
                </div>}
              </div>
            </Link>
          </div>
        </div>
      )
    }
}

export default UserBio

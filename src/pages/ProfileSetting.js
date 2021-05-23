import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './style/ProfileSetting.css'

const ProfileSetting = () => {
  return (
    <>
    <Navbar/>
    <div className="setting-container">
      <div className="setting-wrapping">
        <div className="setting-left">
          <div className="setting-left-wrapper">
            <div className="photo">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="user" />
            </div>
            <h1>Alfian</h1>
            <div className="location-setting">
              <p>Kediri</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid obcaecati, aspernatur nam voluptatibus illo, fugiat assumenda recusandae numquam, voluptas eius enim. Accusamus commodi natus totam laborum quam nemo veritatis maiores?</p>
            <div className="interest">
              <div className="interest-box">
                <p>Gokil</p>
              </div>
              <div className="interest-box">
                <p>Abiez</p>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-right">
          <div className="setting-right-wrapper">
            <div className="title">
              <h2>Personal Information</h2>
            </div>
            <form>
              <label htmlFor="bio">Bio :</label>
              <input type="text" name="bio" id="bio" placeholder="write your new bio" />
              <label htmlFor="location">Location :</label>
              <input type="text" name="location" id="location" placeholder="update your location" />
              <div className="btn">
                <button>cancel</button>
                <input type="submit" defaultValue="update" />
              </div>
            </form>
            <button className="reset">Reset Password</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProfileSetting

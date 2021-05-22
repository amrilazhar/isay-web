import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statusInterest, userActions } from '../redux/actions'

import Navbar from '../components/Navbar'
import FilterBox from '../components/FeedPage/FilterBox'
import WriteStatusBox from '../components/FeedPage/WriteStatusBox'
import FeedBox from '../components/FeedPage/FeedBox'
import Footer from '../components/Footer'
import './style/FeedPage.css'

const FeedPage = () => {

  const [paramInterest, setParamInterest] = useState({
    param:""})
  const dispatch = useDispatch()

  const{param} = paramInterest

  //START PROCESS FEED BOX
  useEffect(() => {
    dispatch(statusInterest.getStatus(param))
  },[])

  const statusUpdate = useSelector ((state) => state.statusInterest)

  const feedBox = () => {
    if (statusUpdate.loading){
      return (
        <>
        <div className="isay-status-box">
          <div className="user-status">
            <div className="upper-prop">
              <div className="user-image-load">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
              </div>
              <div className="name-and-time-load">
              </div>
              <div className="status-interest-load"></div>
            </div>
            <div className="lower-prop-load"></div>
          </div>
          <div className="do-at-status-load"></div>
        </div>
        <div className="isay-status-box">
          <div className="user-status">
            <div className="upper-prop">
              <div className="user-image-load">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
              </div>
              <div className="name-and-time-load">
              </div>
              <div className="status-interest-load"></div>
            </div>
            <div className="lower-prop-load"></div>
          </div>
          <div className="do-at-status-load"></div>
        </div>
        <div className="isay-status-box">
          <div className="user-status">
            <div className="upper-prop">
              <div className="user-image-load">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
              </div>
              <div className="name-and-time-load">
              </div>
              <div className="status-interest-load"></div>
            </div>
            <div className="lower-prop-load"></div>
          </div>
          <div className="do-at-status-load"></div>
        </div>
        <div className="circle-box-load">
          <div className="circle-load"></div>
          <div className="circle-load"></div>
          <div className="circle-load"></div>
        </div>
        </>
      )
    } else {
      return (
        <>
        {statusUpdate.status.data.map((user) => (
          <FeedBox cardy={{
            name: `${user.owner.name}`,
            content: `${user.content}`,
            interest: `${user.interest[0].interest}`
            }}
          />
        ))}
        </>
      )
    }
  }
  //END PROCESS FEED BOX

  //START PROCESS FILTER BOX
  useEffect(() => {
    dispatch(userActions.getActive())
  },[])

  const userActive = useSelector ((state) => state.users)

  const filterBox = () => {
    if (userActive.loading){
      return (
        <div>404</div>
      )
    } else {
      return (
        <> 
          <FilterBox
          setParamInterest={setParamInterest}
          paramInterest={paramInterest}
          />
        </>
      )
    }
  }
  //END PROCESS FILTER BOX

  return (
    <>
    <Navbar/>
    <div className="feed-container">
      <div className="feed-wrapping">
        {filterBox()}
        <div className="right-content">
          <div className="right-wrapping">
            <WriteStatusBox/>
            <div className="realtime-feed">
              {feedBox()}
              <div className="pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default FeedPage

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statusInterest } from '../redux/actions'

import Navbar from '../components/Navbar'
import FilterBox from '../components/FeedPage/FilterBox'
import WriteStatusBox from '../components/FeedPage/WriteStatusBox'
import FeedBox from '../components/FeedPage/FeedBox'
import Footer from '../components/Footer'
import './style/FeedPage.css'


const FeedPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(statusInterest.getStatus())
  },[])

  const statusUpdate = useSelector ((state) => state.statusInterest)
  console.log(statusUpdate)


  const feedBox = () => {
    if (statusUpdate.loading){
      return (
        <div>
          404
        </div>
      )
    } else {
      return (
        <>
        {statusUpdate.status.data.map((user) => (
          <FeedBox cardy={{
            name: `${user.owner.name}`,
            content: `${user.content}`,
            interest: `${user.interest[0].interest}`
          }}/>
        ))}
        </>
      )
    }
  }

  return (
    <>
    <Navbar/>
    <div className="feed-container">
      <div className="feed-wrapping">
        <FilterBox/>
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

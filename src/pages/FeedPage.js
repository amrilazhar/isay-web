import React from 'react'
import FeedBox from '../components/FeedPage/FeedBox'
import FilterBox from '../components/FeedPage/FilterBox'
import WriteStatusBox from '../components/FeedPage/WriteStatusBox'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import './style/FeedPage.css'

const FeedPage = () => {
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
              <FeedBox/>
              <FeedBox/>
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

import React from 'react'
import FeedBox from '../components/FeedBox'
import FilterBox from '../components/FilterBox'
import Footer from '../components/Footer'
import WriteStatusBox from '../components/WriteStatusBox'
import './style/FeedPage.css'

const FeedPage = () => {
  return (
    <>
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

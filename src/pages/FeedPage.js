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
        <FeedBox/>
      )
    } else {
      return (
        <>
        {statusUpdate.status.data.map((user) => (
          <FeedBox cardy={{
            name: `${user.owner.name}`,
            content: `${user.content}`,
            interest: `${user.interest[0].interest}`,
            time: `${user.created_at}`
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
        <FilterBox/>
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

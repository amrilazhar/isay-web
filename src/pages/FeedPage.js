import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statusInterest, userActions } from '../redux/actions'

import Navbar from '../components/Navbar'
import FilterBox from '../components/FeedPage/FilterBox'
import WriteStatusBox from '../components/FeedPage/WriteStatusBox'
import FeedBox from '../components/FeedPage/FeedBox'
import Footer from '../components/Footer'
import './style/FeedPage.css'
import Pagination from '@material-ui/lab/Pagination'

const FeedPage = () => {

  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [paramInterest, setParamInterest] = useState({
    param:""})

  const{param} = paramInterest

  const clickPage = (event, value) => {
    setPage(value)
    const page = value
    dispatch(statusInterest.getStatus(param, page))
  }

  //START PROCESS FEED BOX
  useEffect(() => {
    dispatch(statusInterest.getStatus(param, page))
  },[])

  useEffect(() => {
    dispatch(userActions.getActive())
  },[])

  const statusUpdate = useSelector ((state) => state.statusInterest)

  return (
    <>
    <Navbar/>
    <div className="feed-container">
      <div className="feed-wrapping">
        <FilterBox
          setParamInterest={setParamInterest}
          paramInterest={paramInterest}
          setPage={setPage}
        />
        <div className="right-content">
          <div className="right-wrapping">
            <WriteStatusBox
              setPage = {setPage}
            />
            <div className="realtime-feed">
              <FeedBox/>
              {statusUpdate.loading?
                <div className="circle-box-load">
                  <div className="circle-load"></div>
                  <div className="circle-load"></div>
                  <div className="circle-load"></div>
                </div>:
                <Pagination count={`${statusUpdate?.status?.totalPages}`} page={page} color="primary" className="notification-pagination" onChange={clickPage}/>}
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

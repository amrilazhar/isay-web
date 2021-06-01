import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authHeader } from '../../helpers'
import { scrollToTop } from '../../helpers/scrollToTop'
import './style/UserAct.css'
import UserActMap from './UserActMap'

const UserAct = (fromUserPage) => {

  const userId = fromUserPage.userId
  const userName = fromUserPage.userName

  const [dataActivity, setDataActivity] = useState(null)
  const pageCount = dataActivity?.totalPages


  const [page, setPage] = useState(1)

  const clickPage = (event, value) => {
    setPage(value)
    dispatch(scrollToTop)
  }


  const dispatch = useDispatch()
  
  useEffect(() => {

    dispatch ({type: "GET_ACTIVITY_REQUEST"})

    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    };

    axios
      .get (`https://isay.gabatch11.my.id/profile/an/Activities/${userId}?page=${page}`, requestOptions)
      .then (response => {
        setTimeout(() => {
          dispatch({type: "GET_ACTIVITY_SUCCESS", payload: response.data})
        }, 2500)
        setDataActivity(response.data)
      })
      .catch(error => {
        dispatch({type: "GET_ACTIVITY_FAILURE", error})
      })

  },[page])

  return (
    <div className="realtime-feed-act">

      {(!dataActivity)?
        <div></div>:
        <>
        {dataActivity?.data?.map(act =>     
          <UserActMap
          userName = {userName}
          type = {act.type}
          valueOfStatus = {act.status_id}
          ownerId = {act.status_id?.owner?.id}
          interest = {act.status_id?.interest[0]?.interest}
          statusOwner = {act.status_id?.owner?.name}
          avatar = {act.status_id?.owner?.avatar}
          location = {act.status_id?.owner?.location?.city}
          content = {act.status_id?.content}
          media = {act.status_id?.media}
          likeLength = {act.status_id?.likeBy?.length}
          commentLength = {act.status_id?.comment?.length}
          actDate = {moment(new Date(act.created_at)).fromNow()}
          statusDate = {moment(new Date(act.status_id?.created_at)).fromNow()}
          />
          )
        }
        <Pagination
          count={`${pageCount}`}
          page={page}
          color="primary"
          className="pagination" 
          onChange={clickPage}
        />
        </>
      }
    </div>
  )
}

export default UserAct

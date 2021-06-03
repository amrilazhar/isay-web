import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { authHeader } from '../helpers'
import { userActions } from '../redux/actions'
import './style/SingleStatus.css'

const SingleStatus = () => {

  const {statusId} = useParams()
  const dispatch = useDispatch()

  const [dataSingleStatus, setDataSingleStatus] = useState(null)


  useEffect(() => {
    dispatch ({type: "GET_SINGLE_STATUS_REQUEST"})

    const requestOptions = {
      headers: authHeader()
    };

    axios
      .get (`https://isay.gabatch11.my.id/status/${statusId}`, requestOptions)
      .then (response => {
        setTimeout(() => {
          dispatch({type: "GET_SINGLE_STATUS_SUCCESS", payload: response.data.data})
        }, 2500)
        setDataSingleStatus(response.data.data)
      })
      .catch(error => {
        dispatch({type: "GET_SINGLA_STATUS_FAILURE", error})
      })
  },[])

  useEffect(() => {
    dispatch(userActions.getActive())
  },[])

  return (
    <>
      <Navbar/>
      <div className="single-container">
        <div className="single-wrapper">
          <div className="top-container">
            <div className="user-image">
              <img src={dataSingleStatus?.owner?.avatar} alt="dataSingleStatus" />
            </div>
            <div className="name-and-time">
              <h2>{dataSingleStatus?.owner?.name}</h2>
              <p>
                { (dataSingleStatus?.created_at !== undefined)?
                  moment(new Date(dataSingleStatus?.created_at)).fromNow():
                  dataSingleStatus?.created_at
                }
              </p>
            </div>
            <div className="loc-and-int">
              <div className="status-interest">
                <button value={`${dataSingleStatus?.interest[0]?._id}`}>{dataSingleStatus?.interest[0]?.interest}</button>
              </div>
              <div className="status-location">
                <p>
                  <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="1x" color="#fffff"/>
                  {dataSingleStatus?.owner?.location?.city}
                </p>
              </div>
            </div>
          </div>
          <div className="bottom-container">
            <div className="left-bottom-container">
              <div className="content">
                <p>
                  {dataSingleStatus?.content}
                </p>
              </div>
              
              <div className="media">
                {(!dataSingleStatus?.media)?
                  <div></div>:
                  <> {
                    dataSingleStatus?.media?.map( media =>
                      <div className="post-image">
                        <img src={media} alt="post" />
                      </div>
                    )
                  } </>
                }
              </div>
            </div>
            <div className="right-bottom-container">
              <div className="top-bar">
                <div className="like">Like</div>
                <div className="comment">Comment</div>
                <div className="private">Private Chat</div>
              </div>
              <div className="comment-load">
                <form>
                  <textarea name="comment" id="comment" cols={30} rows={10} defaultValue={""} />
                </form>
                <div className="comment-map-container">
                  <div className="comment-map">
                    <div className="identity">
                      <div className="name">Raflesia</div>
                      <div className="time">4 Hours Ago</div>
                    </div>
                    <div className="comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt alias eos quidem hic, exercitationem sequi deleniti vero sed laudantium praesentium. Est esse aspernatur eos neque, eius officia eveniet ipsum asperiores.</div>
                  </div>
                  <div className="comment-map">
                    <div className="identity">
                      <div className="name">Raflesia</div>
                      <div className="time">4 Hours Ago</div>
                    </div>
                    <div className="comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt alias eos quidem hic,
                      exercitationem sequi deleniti vero sed laudantium praesentium. Est esse aspernatur eos neque, eius officia eveniet
                      ipsum asperiores.</div>
                  </div>
                  <div className="comment-map">
                    <div className="identity">
                      <div className="name">Raflesia</div>
                      <div className="time">4 Hours Ago</div>
                    </div>
                    <div className="comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt alias eos quidem hic,
                      exercitationem sequi deleniti vero sed laudantium praesentium. Est esse aspernatur eos neque, eius officia eveniet
                      ipsum asperiores.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default SingleStatus

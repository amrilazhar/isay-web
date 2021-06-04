import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { authHeader, history } from '../helpers';
import './style/CheckPage.css'

const CheckPage = () => {
  
  const dispatch = useDispatch()

  const [verifMessage, setVerifMessage] = useState("verifying your account")
  
  useEffect(() => {
    dispatch(request());

    const requestOptions = {
        headers: authHeader()
    };

    axios.get (`https://isay.gabatch11.my.id/profile/getProfile`, requestOptions)
      .then(
        interest => {
          dispatch(success(interest))
          localStorage.setItem('interest', JSON.stringify(interest?.data?.data?.interest))
          setVerifMessage(`welcome home ${interest?.data?.data?.name}`)
          setTimeout(() => {
              history.push("/")
          }, 5000)
           }
           )
      .catch(
        error => {
          dispatch(failure(error.toString()))
            setVerifMessage("looks like you are new user please answer the question")
            setTimeout(() => {
              history.push("/signupquest/1")
          }, 5000)
        }
           );

    function request() { return { type: "CHECK_INTEREST_REQUEST" } }
    function success(interest) { return { type: "CHECK_INTEREST_SUCCESS", payload: interest.data.interest } }
    function failure(error) { return { type: "CHECK_INTEREST_FAILURE", error } }
	}, []);

  return (
    <div className="checker-container">
      <div className="checker-zoomify">
        <div className="text-verif">{verifMessage}</div>
        <img src="https://ik.imagekit.io/alfianpur/Final_Project/ISAY_Logo_E49o2Lr2s.png" alt="isay logo" />
      </div>
    </div>
  )
}

export default CheckPage

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statusInterest } from '../../redux/actions'


import './style/FilterBox.css'

const FilterBox = (proper) => {

  const dispatch = useDispatch()

  //START GET INTEREST ID TO PARENTS
  const setParamInterest = proper.setParamInterest

  const [bro, setbro] = useState({
      bro: '',
  });

  const handleChange = (e) => {
    setParamInterest ({
      "param":[e.target.defaultValue]
    }
    )
    setbro ({
      "bro":[e.target.defaultValue]
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setParamInterest ({
      "param": bro.bro
    })
    const param  = bro.bro
    console.log("kirim filter", param)
    dispatch(statusInterest.getStatus(param))

  }

  //END GET INTEREST ID TO PARENTS

  //START INTEREST USER FOR FILTER
  const userActive = useSelector ((state) => state.users)

  const mapInterest = () => {
    if (userActive.loading){
      return (
        <div className="choice">
          <div className="waiting">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )
    } else {
      return userActive.items?.interest.map (fil =>
        <div className="choice">
          <label
            htmlFor={`${fil.interest.toLowerCase()}`}
            id={`${fil.interest.toLowerCase()}`}
          >{fil.interest}</label>
          <input
            type="radio"
            name="interest"
            for={`${fil.interest.toLowerCase()}`}
            id={`${fil.interest.toLowerCase()}`}
            defaultValue={`${fil._id.toLowerCase()}`}
            onChange={handleChange}
          />
        </div>
      )
    }
  }
  //END INTEREST USER FOR FILTER

  return (
    <div className="left-content">
      <div className="left-wrapping">
        <h2>What topic would you like to see?</h2>
        <p>You can only choose one. Go to interest on your profile to add more interest.</p>
        <div className="filter-box">
          <form onSubmit={handleSubmit}>
            <div className="choice">
              <label htmlFor="allInterest">All my interest</label>
              <input
                type="radio"
                name="interest"
                id="allInterest"
                defaultValue=""
                onChange={handleChange}
              />
            </div>
            {mapInterest()}
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default FilterBox

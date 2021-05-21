import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/actions'

import './style/FilterBox.css'

const FilterBox = (proper) => {
      const filter = proper.filter
      console.log("inifilter", filter.interest[0])

      const mapInterest = () => {
        if (!filter){
          return (
          <div>404</div>
          )
        } return filter.interest[0].map (fil =>
            <div className="choice">
              <label htmlFor={`${fil.interest.toLowerCase()}`}>{fil.interest}</label>
              <input type="radio" name="interest" id={`${fil.interest.toLowerCase()}`} defaultValue={`${fil.interest.toLowerCase()}`} />
            </div>
          )
      }

  return (
    <div className="left-content">
      <div className="left-wrapping">
        <h2>What topic would you like to see?</h2>
        <p>You can only choose one. Go to interest on your profile to add more interest.</p>
        <div className="filter-box">
          <form action method="get">
            <div className="choice">
              <label htmlFor="allInterest">All my interest</label>
              <input type="radio" name="interest" id="allInterest" defaultValue="allInterest" />
            </div>
            {mapInterest()}
            
            {/* <div className="choice">
              <label htmlFor="social">Social</label>
              <input type="radio" name="interest" id="social" defaultValue="social" />
            </div>
            <div className="choice">
              <label htmlFor="business">Business</label>
              <input type="radio" name="interest" id="business" defaultValue="business" />
            </div>
            <div className="choice">
              <label htmlFor="politics">Politics</label>
              <input type="radio" name="interest" id="politics" defaultValue="politics" />
            </div>
            <div className="choice">
              <label htmlFor="art">Art</label>
              <input type="radio" name="interest" id="art" defaultValue="art" />
            </div> */}
            <input type="submit" defaultValue="Update" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default FilterBox

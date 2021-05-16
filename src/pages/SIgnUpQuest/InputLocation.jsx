import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import "./style/InputLocation.css";
import { Autocomplete } from '@material-ui/lab';

import React, { useEffect, useState } from "react"
import { inputLocationData } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"

const InputLocation = () => {
    const dispatch = useDispatch();
    // const [display, setDisplay] = useState(false)
    // const [inputValue, setInputValue] = useState('')

    useEffect (() => {
        dispatch(inputLocationData.getInputLocation())
    },[]) 

    const inputLocationUpdate = useSelector((state) => state.inputLocationData)
    console.log('ini', inputLocationUpdate)

    const displayLocationData = () => {
        if (inputLocationUpdate === true) {
            return <div>Not Found</div>
        } else {
            return (
                <>
                    <Autocomplete
                        id="combo-box-demo"
                        options= {inputLocationUpdate.locations.data}
                        value = {inputLocationUpdate.locations.data}
                        autoHighlight= {true}
                        noOptionsText = 'Not Found'
                        fullWidth= {true}
                        popupIcon= {<LocationOnIcon/>}
                        getOptionLabel= {(input) => `${input.province}, ${input.city_type} ${input.city}, ${input.country}`}
                        renderInput= {(params) => <TextField {...params} variant="outlined" label="Type a city's name"/>}
                    />
                </>
            )
            // <LocationOnIcon color="disabled"/>

    }
}
    return (
        <div className="background-location">
            <div className="location-wrapper">
                <div className= "location-container">
                    <h1 className="location-line1">
                        Welcome to i-Say
                    </h1>
                    <h3 className="location-line2">
                        Everyone deserves to be heard, now it's your time
                    </h3>
                    <div className="location-line3">
                        <LocationOnIcon />
                        <p>Where is the city you live in?</p>
                    </div>
                    <p className="location-line4" >Let people find your great thoughts</p>
                    <div className="location">
                        {displayLocationData()}
                        <button className="btn-location" ><Link to="/interest">Next</Link></button>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default InputLocation;
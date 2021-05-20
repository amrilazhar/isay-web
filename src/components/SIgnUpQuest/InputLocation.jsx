import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import "./style/InputLocation.css";
import { Autocomplete } from '@material-ui/lab';

import React, { useEffect } from "react";
import { inputLocationData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, useHistory } from "react-router-dom";

const InputLocation = ({...props}) => {
    const {setShowLocation, setShowInterest, setCreateFirstProfile, createFirstProfile} = props;
    const dispatch = useDispatch();
    const inputLocationUpdate = useSelector((state) => state.inputLocationData);
    let {id} = useParams();
    let history = useHistory();

    const handleLocation = () => {
        setShowLocation(false);
        setShowInterest(true);
        history.replace("/signupquest/2");
    }
    
    useEffect (() => {
        dispatch(inputLocationData.getInputLocation());
        if(id === 1) {
            dispatch(inputLocationData.getInputLocation())
        }
    },[id]) 

    const handleValueLocation = (e) => {
        const valueloc =  e?.target?.innerText?.split(", ")[1];
        const valueCity = valueloc?.split(" ");
        console.log("valueCity", valueCity );
        const selectedLoc = (valueCity === undefined)? {_id: "0"} : (valueCity.length < 3)? inputLocationUpdate?.locations?.data?.find(value => value.city === valueCity[1]) : inputLocationUpdate?.locations?.data?.find(value => value.city === valueCity[1].push(valueCity[2])); 
        setCreateFirstProfile({...createFirstProfile, location: selectedLoc["_id"]});
        console.log("valueloc2", valueloc);
        console.log("selectedLoc", selectedLoc);
        console.log("valueCity", valueCity );

    } 
    console.log("createFirstProfile", createFirstProfile);
    console.log('windows',id);

    const displayLocationData = () => {
        if (inputLocationUpdate === true) {
            return <div>Not Found</div>
        } else {
            return (
                <>
                    <Autocomplete
                        key={Date.now}
                        onChange={handleValueLocation}
                        value = {inputLocationUpdate.locations.data}
                        id="combo-box-demo"
                        options= {inputLocationUpdate?.locations?.data}
                        autoHighlight= {true}
                        noOptionsText = 'Not Found'
                        fullWidth= {true}
                        popupIcon= {<LocationOnIcon/>}
                        getOptionLabel= {(input) => `${input?.province}, ${input?.city_type} ${input?.city}, ${input?.country}`}
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
                        <button className="btn-location" onClick={handleLocation}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputLocation;
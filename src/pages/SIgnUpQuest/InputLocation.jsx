import React from "react"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from "@material-ui/core";
import {Link} from "react-router-dom"
import "./style/InputLocation.css";

const InputLocation = () => {
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
                        <TextField id="outlined-basic" placeholder="Type a city's name" variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <LocationOnIcon color="disabled"/>
                            </InputAdornment>,
                            }}
                        style={{width: "80%", transform: "translateY(4rem)"}} 
                        />
                        <button className="btn-location" ><Link to="/interest">Next</Link></button>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default InputLocation;
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom"
import "./style/InputActivity.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { inputActivityData } from '../../redux/actions';


const InputActivity = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(inputActivityData.getInputActivity())
    }, []);

    const InputActivityUpdate = useSelector((state) => state.inputActivityData);
    console.log("ini", InputActivityUpdate)

    const displayActivityCheckBox = () => {
        if (InputActivityUpdate.loading === true) {
            return <div>loading...</div>
        } else {
            return (
                <>
                    {InputActivityUpdate.activities.data.map((input, activity) =>(
                        <div>
                            <FormControlLabel control={<Checkbox/> }
                            key = {activity}
                            label= {input.interest}
                            />
                        </div>
                    ))}
                </>
            )
        }
    }   

    return(
    <div className="background-activity">
        <div className="activity-wrapper">
            <div className="activity-container">
                <h3 >One more step to enter the room.....</h3>
                <h3 >What activity do you always do in a week?</h3>
                <p >Avatar that you will get will be choosen based on your answer some of short question below</p>
                <div className="checklist-activity">
                    {displayActivityCheckBox()}
                </div>
                <div className="information">
                    <p className="information-sign">i</p>
                    <p className="information-content">You can choose as much as you want</p>
                    <button className="btn-activity"><Link to="/login">Next</Link></button>
                </div>
            </div>
        </div>
    </div>    
    )
}

export default InputActivity;

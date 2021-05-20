import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory} from "react-router-dom"
import "./style/InputActivity.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { inputActivityData } from '../../redux/actions';


const InputActivity = ({...props}) => {
    const {setShowInterest, setShowActivity, createFirstProfile, setCreateFirstProfile} = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const InputActivityUpdate = useSelector((state) => state.inputActivityData);
    console.log("ini", InputActivityUpdate)

    useEffect(() => {
        dispatch(inputActivityData.getInputActivity());
    }, []);

    const handleChangeActivity = (event)=> {
        setCreateFirstProfile({
            ...createFirstProfile, 
            [event.target.name]: [...createFirstProfile.activity, event.target.value]
        });
        console.log("eventAct", event.target.value)
    };
    console.log("createFirstProfile", createFirstProfile)

    
    const displayActivityCheckBox = () => {
        if (InputActivityUpdate.loading === true) {
            return <div>loading...</div>
        } else {
            return (
                <>
                    {InputActivityUpdate.activities.data.map((input, activity) =>(
                        <div>
                            <FormControlLabel 
                            name="activity"
                            control={<Checkbox/> }
                            value = {input["_id"]}
                            label= {input.interest}
                            onChange={handleChangeActivity}
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
            <div className="activity-sub-container">
                <div className="activity-sub-wrapper">
                    <h3 >One more step to enter the room.....</h3>
                    <h3 >What activity do you always do in a week?</h3>
                    <p >Avatar that you will get will be choosen based on your answer some of short question below</p>
                    <div className="checklist-activity">
                        {displayActivityCheckBox()}
                    </div>
                    <div className="information">
                        <p className="information-sign">i</p>
                        <p className="information-content">You can choose as much as you want</p>
                        <div>
                            <button className="btn-activity-next" onClick={() => {setShowActivity(false); history.push("/avatar")}}>Next</button>
                           <button className="btn-activity-back" onClick={() => {setShowInterest(true); setShowActivity(false)}}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    )
}

export default InputActivity;

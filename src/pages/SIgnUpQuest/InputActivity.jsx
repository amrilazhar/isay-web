import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./style/InputActivity.css";
import {Link} from "react-router-dom"

const InputActivity = () => {
    
    return(
    <div className="background-activity">
        <div className="activity-wrapper">
            <div className="activity-container">
                <h3 >One more step to enter the room.....</h3>
                <h3 >What activity do you always do in a week?</h3>
                <p >Avatar that you will get will be choosen based on your answer some of short question below</p>
                <div className="checklist-activity">
                    <FormControlLabel 
                        control={<Checkbox/> }
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
                    <FormControlLabel 
                        control={<Checkbox/>}
                        label="lorem"
                    />
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

import React, { useEffect } from "react"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom"
import "./style/InputInterest.css";
import { useDispatch, useSelector } from "react-redux";
import { inputInterestData } from "../../redux/actions/input.interest.action";

const InputInterest = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(inputInterestData.getInputInterest())
    },[])

    const inputInterestUpdate = useSelector((state) => state.inputInterestData)
    console.log(inputInterestUpdate.loading)

    return(
        <>
        {inputInterestUpdate.interest.data.map((input) => (
        <div className="background-interest">
            <div className="interest-wrapper">
                <div className="interest-container">
                    <h3>Pour your thoughts without fear</h3>
                    <p>No need to be scared to say your thoughts because you will be annonymous here. However, let them remember you through an <b style={{fontWeight:"bold"}}>Avatar.</b></p>
                    <h3>What do you do in your free time?</h3>
                    <p>Avatar that you will get will be choosen based on your answer some of short question below</p>
                    <div className="checklist-interest">
                        <FormControlLabel 
                                control={<Checkbox/>}
                                // key = {key._id}
                                label= {input.interest}
                            />
                            <FormControlLabel 
                                control={<Checkbox/>}
                                // key = {key._id}
                                label={input.interest}
                            />
                            <FormControlLabel 
                                control={<Checkbox/>}
                                // key = {key._id}
                                label={input._id}

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
                        <button className="btn-interest"><Link to="/activity">Next</Link></button>
                    </div>
                </div>
            </div>
        </div>
    ))}
    </>
    )
}

export default InputInterest;

import React, { useEffect } from "react"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom"
import "./style/InputInterest.css";
import { useDispatch, useSelector } from "react-redux";
import { inputInterestData } from "../../redux/actions";

const InputInterest = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(inputInterestData.getInputInterest())
    },[])

    const inputInterestUpdate = useSelector((state) => state.inputInterestData)
    console.log("ini",inputInterestUpdate)

    const displayCheckBox = () => {
        if (inputInterestUpdate.loading === true) {
            return <div>Loading...</div>
        } else {
            return ( 
                <>
                    {inputInterestUpdate.interest.data.map((input, index) => (
                        <div>
                            <FormControlLabel 
                                control={<Checkbox/>}
                                key= {index}
                                label= {input.interest}
                            />
                        </div>
                    ))}
                </>           
             )
        }
    }
    
    return(
        <>
            <div className="background-interest">
                <div className="interest-wrapper">
                    <div className="interest-container">
                        <h3>Pour your thoughts without fear</h3>
                        <p>No need to be scared to say your thoughts because you will be annonymous here. However, let them remember you through an <b style={{fontWeight:"bold"}}>Avatar.</b></p>
                        <h3>What do you do in your free time?</h3>
                        <p>Avatar that you will get will be choosen based on your answer some of short question below</p>
                        <div className="checklist-interest">
                            {displayCheckBox()}
                        </div>
                        <div className="information">
                            <p className="information-sign">i</p>
                            <p className="information-content">You can choose as much as you want</p>
                            <Link to="/activity"><button className="btn-interest">Next</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputInterest;

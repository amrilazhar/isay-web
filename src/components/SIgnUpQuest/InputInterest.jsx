import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory} from "react-router-dom"
import "./style/InputInterest.css";

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { inputInterestData } from "../../redux/actions";

const InputInterest = ({...props}) => {
    const {setShowLocation, setShowInterest, setShowActivity, setCreateFirstProfile, createFirstProfile} = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const inputInterestUpdate = useSelector((state) => state.inputInterestData);
    // console.log("ini",inputInterestUpdate)
    console.log("ini", inputInterestUpdate);
    console.log("createFirstProfile", createFirstProfile);

    useEffect(() => {
        dispatch(inputInterestData.getInputInterest())
    },[])

    const handleChangeInterest = event => {
        const index = createFirstProfile[event.target.name].indexOf(
            event.target.value
          );
          console.log('index', index)
      
          if (event.target.checked && index === -1) {
            // console.log("eventInter", event.target.value);
            // console.log(
            //   "inputInterestUpdate.interest.data",
            //   inputInterestUpdate.interest.data
            // );
      
            return setCreateFirstProfile({
              ...createFirstProfile,
              [event.target.name]: [
                ...createFirstProfile.interest,
                event.target.value,
              ],
            });
          }
      
          if (!event.target.checked && index !== -1) {
            const newInterest = [...createFirstProfile.interest];
      
            newInterest.splice(index, 1);
      
            // console.log("eventInter", event);
            // console.log(
            //   "inputInterestUpdate.interest.data",
            //   inputInterestUpdate.interest.data
            // );
      
            return setCreateFirstProfile({
              ...createFirstProfile,
              [event.target.name]: [...newInterest],
            });
          }
      };
    
    const displayInterestCheckBox = () => {
        if (inputInterestUpdate.loading === true) {
            return <h1>Loading...</h1>
        } else {
            return ( 
                <>
                    {inputInterestUpdate.interest.data.map((input, interest) => {
                        // console.log('interest', interest)
                        // console.log('find', createFirstProfile.interest.some(value => value === '6092b557e957671c70e24279'))
                        return (
                            <div>
                                <FormControlLabel 
                                    name = "interest"
                                    key = {interest}
                                    control={<Checkbox/>}
                                    label= {input.interest}
                                    value={input["_id"]}
                                    onChange={handleChangeInterest}
                                    checked={createFirstProfile.interest.some(value => value === input['_id'])}
                                />
                            </div>
                        )
                    })}
                </>           
             )
        }
    }
    
    return(
        <>
            <div className="background-interest">
                <div className="interest-wrapper">
                    <div className="interest-sub-container">
                        <div className="interest-sub-wrapper">
                            <h2>Pour your thoughts without fear</h2>
                            <p>No need to be scared to say your thoughts because you will be annonymous here. However, let them remember you through an <b style={{fontWeight:"bold"}}>Avatar.</b></p>
                            <h3>What do you do in your free time?</h3>
                            <p>Avatar that you will get will be choosen based on your answer some of short question below</p>
                            <div className="checklist-interest">
                                {displayInterestCheckBox()}
                            </div>
                            <div className="information">
                                <div className="interest-info-sign-content">
                                    <p>i</p>
                                    <p>You can choose as much as you want</p>
                                </div>
                                <div className="btn-interest-next-back"> 
                                    <button onClick={() => {setShowActivity(true); setShowInterest(false); history.replace("/signupquest/3")}}>Next</button>
                                    <button onClick={() => {setShowLocation(true); setShowInterest(false)}}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputInterest;

import React, { useState } from "react";
import InputActivity from "../components/SIgnUpQuest/InputActivity";
import InputInterest from "../components/SIgnUpQuest/InputInterest";
import InputLocation from "../components/SIgnUpQuest/InputLocation";

const SignupQuest = () => {

    const [showLocation , setShowLocation] = useState(true);
    const [showInterest , setShowInterest] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [createFirstProfile, setCreateFirstProfile] = useState({
        location: null,
        interest: [],
        activity: []
    })

    return(
        <>
            {showLocation? <InputLocation setShowInterest={setShowInterest} setShowLocation={setShowLocation} setCreateFirstProfile={setCreateFirstProfile} createFirstProfile={createFirstProfile}/> : null}
            {showInterest? <InputInterest setShowInterest={setShowInterest} setShowActivity={setShowActivity} setShowLocation={setShowLocation} setCreateFirstProfile={setCreateFirstProfile} createFirstProfile={createFirstProfile}/> : null}
            {showActivity? <InputActivity setShowActivity={setShowActivity} setShowInterest={setShowInterest} setCreateFirstProfile={setCreateFirstProfile} createFirstProfile={createFirstProfile}/> : null}
        </>
    )
}

export default SignupQuest;
import React from "react"
import Button from '@material-ui/core/Button';
import "./style/leftSide.css"

const TopicofInterest = () => {
    return(
        <div className="topic-container">
            <div className="topic-wrapper">
                <h3>Topics you are interested in</h3>
                <p>Click the hashtags below to create a status according to the topic you’re going to post about</p>
                <div className="topic-hashtag">
                    <ul>
                        <li>#Social</li>
                        <li>#Bussiness</li>
                        <li>#Politics</li>
                        <li>#Art</li>
                    </ul>
                </div>
                <Button variant="outlined" selected className="Button" >Add more topics</Button>
            </div>
        </div>
    )
}

export default  TopicofInterest

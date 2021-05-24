import React from "react";

import "./style/leftSideMessage.css"
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const LeftSideMessage = () => {
    return(
        <div className="left-message-container">
            <div className="left-message-wrapper">
                <div className="search-meassage">
                    <Input 
                    type="search"
                    fullWidth ={true}
                    startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                </div>
                <div className="message-list">
                    <div className="message-head">
                        <div>
                            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="avatar"/>
                        </div>
                        <p>Black swan</p>
                        <p>3 hours ago</p>
                    </div>
                    <div className="message-peak">
                        <p>Lorem ipsum dolor sit amet consectetur....</p>
                    </div>
                </div>
                <div className="message-list">
                    <div className="message-head">
                        <div>
                            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="avatar"/>
                        </div>
                        <p>Black swan</p>
                        <p>3 hours ago</p>
                    </div>
                    <div className="message-peak">
                        <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit.....</p>
                    </div>
                </div>
                <div className="message-list">
                    <div className="message-head">
                        <div>
                            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="avatar"/>
                        </div>
                        <p>Black swan</p>
                        <p>3 hours ago</p>
                    </div>
                    <div className="message-peak">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, molestias!...</p>
                    </div>
                </div>
                <div className="message-list">
                    <div className="message-head">
                        <div>
                            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="avatar"/>
                        </div>
                        <p>Black swan</p>
                        <p>3 hours ago</p>
                    </div>
                    <div className="message-peak">
                        <p>Lorem ipsum dolor sit amet consectetur....</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideMessage;
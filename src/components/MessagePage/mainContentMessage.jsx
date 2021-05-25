import "./style/mainContentMessage.css";
import Button from '@material-ui/core/Button';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SendIcon from '@material-ui/icons/Send';

import React, { useState } from "react";
import { useDispatch } from "react-redux";

const MainContentMessage = () => {
    // const dispatch = useDispatch()

    const [files, setFiles] = useState("")
    const [chatContent, setChatContent] = useState("")

    const uploadFile = (e) => {
        e.preventDefault()
        setFiles([...files, e.target.files[0]])
      }

      const mapImage = () => {
        if (files === ""){
          return (
            <div>
              <img src={"https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_HTxe4aLXT.png"}/>
            </div> 
            )
        } else {
          return files?.map( (i, x) =>
          <div>
            <img src={URL.createObjectURL(files[x])}/>
          </div>
            )
        }
      }  

      const changeTextContent = (e) => {
        console.log('e',e)
        // setChatContent(e?.target.value)
      }

    return(
        <div className="main-message-container">
            <div className="main-message-wrapper">
                <div className="main-message-head">
                    <p>Black swan</p>
                    <p>Online</p>
                    <p>...</p>
                </div>
                <div className="empty-line">
                </div>
                <div className="each-message-personal-wrapper">
                    <div className="each-message-personal-container">
                        <div className="each-message-personal-head">
                            <p>Rafflesia Arnoldi</p>
                            <p>Personal</p>
                        </div>
                        <div className="each-message-personal-content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit earum labore quia ea a consequuntur.</p>
                        </div>
                    </div>
                </div>
                <div className="each-message-public-wrapper">
                    <div className="each-message-public-container">
                        <div className="each-message-public-head">
                            <div>
                                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="avatar"/>
                            </div>
                            <p>You</p>
                            <p>09.45 AM</p>
                        </div>
                        <div className="each-message-public-content">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, eligendi. Ducimus, inventore.
                        </div>
                    </div>   
                </div>
                <div className="chat-image-container">
                    <div>
                        {mapImage()}
                    </div>    
                </div>
                <form className="textarea-wrapper" method="post">
                    <textarea wrap="soft" type="text" name="message" id="message" placeholder="Write a message" defaultValue={""} onChange={ changeTextContent()}/>
                    <div className="message-btn">
                        <div className="message-btn-upload">
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button 
                                className="img-button"
                                variant="contained" component="span" startIcon={<ImageOutlinedIcon/>}
                                onChange={uploadFile}
                                >
                                    Image
                                </Button>
                            </label>
                        </div>
                        <div className="message-btn-send">
                        <Button endIcon={<SendIcon>send</SendIcon>}>Send</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MainContentMessage;
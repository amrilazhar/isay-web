import "./style/mainContentMessage.css";
import Button from "@material-ui/core/Button";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SendIcon from "@material-ui/icons/Send";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import {
  getChatRoomAct,
  chatMessageAct,
  getOlderChatAct,
  alertActions,
} from "../../redux/actions";
import { formatRelative } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { store } from "../../redux/store";
import { useLocation } from "react-router-dom";
import { chatConstant } from "../../redux/type";
import FlashMessage from "../../components/FlashMessage";

import React from "react";
const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";

const MainContentMessage = () => {
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [newImages, setNewImages] = useState([]); // Images to be sent
  const [displayImage, setDisplayImage] = useState([]); // fresh file

  const [loadMore, setLoadMore] = useState(false); // handle scroll
  const [scrollPos, setScrollPos] = useState(""); // handle scroll
  const [scrollActive, setScrollActive] = useState(true); // handle scroll

  const [receiverOnlineStatus, setReceiverOnlineStatus] = useState(false);
  let lastMessage = "";
  const dispatch = useDispatch();

  //get room ID
  const room = useSelector((state) => state.getChatRoom);
  // get chat history
  const chatHistory = useSelector((state) => state.getChatHistory);
  //handle new message
  const chatMessage = useSelector((state) => state.setChatMessage.message);
  //handleOlderChat
  const olderChat = useSelector((state) => state.getOlderChat);
  //handle Alert Message
  const alert = useSelector((state) => state.alert);

  const receiver = useLocation()
    .search.substring(1)
    .split("&")[0]
    .split("=")[1]; // receiverID

  // Sent and received messages
  const socketRef = useRef();

  //=========== Handle Scroll ===================
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  //=========== END Handle Scroll ===================

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newImages.length > 0) {
      sendImages(newImages);
      setNewImages([]);
      //   document.querySelector("#contained-button-file").files = null;
      //   document.querySelector("#contained-button-file").value = "";
    }
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const startServer = (room) => {
    if (socketRef.current === undefined) {
      // Creates a WebSocket connection

      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        transports: ["websocket"],
        path: "/socket",
        upgrade: false,
        query: { roomID: room },
      });
      socketRef.current.emit("connectAs", "im connected to room");

      // Listens for incoming messages
      socketRef.current.on(
        chatConstant.NEW_CHAT_MESSAGE_FROM_SERVER,
        (newMessage) => {
          //combine old message and new message
          dispatch(
            chatMessageAct([
              ...store.getState().setChatMessage.message,
              newMessage,
            ])
          );
        }
      );
      socketRef.current.on("online:" + receiver, (status) =>
        setReceiverOnlineStatus(status)
      );
      // Listens for update in read status of messages
      socketRef.current.on(
        chatConstant.UPDATED_READ_STATUS_MESSAGE_EVENT,
        (newMessageID) => {
          //set status message readed or not
          updateAllReadedStatus([newMessageID]);
        }
      );
    } else {
      if (room === "disconnect") {
        // Destroys the socket reference
        // when the connection is closed
        socketRef.current.disconnect();
      }
    }
  };

  const sendMessage = (messageBody) => {
    setLoadMore(false);
    setScrollActive(true);
    socketRef.current.emit(chatConstant.NEW_CHAT_MESSAGE_EVENT, {
      content: messageBody,
      chatRoom: room.roomData._id,
      to: receiver,
      message_type: "text",
    });
  };

  // ============== Handle Modal Image =======================

  //show & hide
  const [modal, setModal] = useState(false);

  const showModal = (event) => {
    event.preventDefault();
    modal === false ? setModal(true) : setModal(false);
  };

  //display of modal
  const displayModal = () => {
    if (modal === false) {
      return <div></div>;
    } else {
      if (displayImage.length > 0) {
        return (
          <div className="notif-modal">
            <div className="notif-modal-content">
              <div className="upper">
                <p>Select your image(s)</p>
                <button onClick={showModal} className="close-modal">
                  &times;
                </button>
              </div>
              <div>
                <input type="file" />
                <input
                  accept="image/*"
                  id="upload-notif-img"
                  className="upload-notif-img"
                  multiple
                  type="file"
                  onChange={handleNewImagesChange}
                />
                <label htmlFor="upload-notif-img">
                  <strong>Choose your best picture</strong>
                </label>
              </div>
              <div className="image-container">{mapNotifImage()}</div>
              <div className="notif-clear-btn">
                <button
                  onClick={clearAllImages}
                >
                  Clear
                </button>
              </div>
              <div className="notif-text">
                <p>*image(s) size less than 3MB</p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="notif-modal">
            <div className="notif-modal-content">
              <div className="upper">
                <p>Select your image(s)</p>
                <button onClick={showModal} className="close-modal">
                  &times;
                </button>
              </div>
              <div>
                <input type="file" />
                <input
                  accept="image/*"
                  id="upload-notif-img"
                  className="upload-notif-img"
                  multiple
                  type="file"
                  onChange={handleNewImagesChange}
                />
                <label htmlFor="upload-notif-img">
                  <strong>Choose your best picture</strong>
                </label>
              </div>
              <div className="image-container">{mapNotifImage()}</div>
              <div className="notif-text">
                <p>*image(s) size less than 3MB</p>
              </div>
            </div>
          </div>
        );
      }
    }
  };
  // ============== End Modal Image ==========================

  //=============== Handle clear image button =================

  const clearAllImages = () => {
    setNewImages([]);
    setDisplayImage("");
  };

  //================ End Handle clear image button =============

  //================== Handle preview Image ====================

  const handleNewImagesChange = (event) => {
    let imgCont = [];
    let errorFile = [];
    let fileCont = event.target.files;
    let fileImg = [];
    console.log("ini newImage onchange", newImages.length);
    for (const el of fileCont) {
      //rules for upload file less than 3MB and type image
      if (
        (el.type == "image/jpeg" ||
          el.type == "image/png" ||
          el.type == "image/gif" ||
          el.type == "image/bmp") &&
        el.size / (1024 * 1024) < 3
      ) {
        // eslint-disable-next-line no-unused-expressions
        fileImg.push(el);
        encodeBase64(el, (image) => {
          imgCont.push(image);
        });
      } else {
        errorFile.push(el.name);
      }
    }
    if (errorFile.length > 0) {
      let stringError = errorFile.join(`\n, `);
      dispatch(
        alertActions.error(
          `This following file didn't meet our expectation \n(size < 3MB & file type [jpeg, png, gif, bmp]), file : \n ${stringError}.\n Please Re-Select All of the file again`
        )
      );
    } else {
      setNewImages(imgCont);
      setDisplayImage(fileImg);
    }

    // console.log("target", event.target.files);
  };

  console.log("luar fungsi", displayImage.length);
  const mapNotifImage = () => {
    console.log("dalam fungsi", displayImage);
    if (displayImage?.length > 0) {
      return (
        <>
          {displayImage?.map((value, index) => {
            console.log("value dalam fungsi", value);
            return (
              <div className="notif-img-wrapper" key={index}>
                <img
                  src={URL.createObjectURL(displayImage[index])}
                  alt="upload"
                />
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <div className="notif-img-wrapper">
          <img
            src={
              "https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_HTxe4aLXT.png"
            }
            alt={"upload"}
          />
        </div>
      );
    }
  };

  //================== end handle preview Image ====================
  //=============== Handle Send Images ========================

  const encodeBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  console.log("newImage", newImages);

  const sendImages = (messageBody) => {
    setLoadMore(false);
    setScrollActive(true);
    messageBody.forEach((item, i) => {
      console.log("iterasi : ", i);
      socketRef.current.emit(chatConstant.NEW_CHAT_MESSAGE_EVENT, {
        content: item,
        chatRoom: room.roomData._id,
        to: receiver,
        message_type: "images",
      });
    });
  };

  //=============== END Handle Send Images ========================

  //============= Handle Read Status ============================
  const updateAllReadedStatus = (arr) => {
    arr.forEach((item) => {
      let readedStatus = document.querySelector(".readed-" + item);
      if (readedStatus) {
        readedStatus.classList.remove("MuiSvgIcon-colorDisabled");
        readedStatus.classList.add("MuiSvgIcon-colorPrimary");
      }
    });
  };

  const setReadStatus = (messageID, chatType, idx) => {
    if (chatType === "new") {
      chatMessage[idx].readed = true;
    } else if (chatType === "history") {
      chatHistory.message[idx].readed = true;
    } else if (chatType === "older") {
      olderChat.message[idx].readed = true;
    }
    socketRef.current.emit(chatConstant.SET_READ_STATUS_MESSAGE_EVENT, {
      message_id: messageID,
    });
  };
  //============= END Handle Read Status ========================

  //============== Handle Load Older Chat ======================
  const loadOlderChat = () => {
    let roomID = room.roomData._id;
    let getlastMessage =
      lastMessage === "" ? chatHistory.message[0]._id : lastMessage;
    setLoadMore(true);
    setScrollActive(false);
    setScrollPos(getlastMessage);
    dispatch(getOlderChatAct(roomID, getlastMessage, olderChat.message));
  };

  const printOlderChat = () => {
    if (!olderChat.loading && !chatHistory.loading) {
      lastMessage =
        olderChat.message.length > 0
          ? olderChat.message[0]._id
          : chatHistory.message.length > 0
          ? chatHistory.message[0]._id
          : "";
      return displayChatMessage(olderChat.message, "older");
    }
  };
  //============== END Handle Load Older Chat ======================
  //create display chat name
  const displayChatName = () => {
    if (!room.loading) {
      let name = "";
      let onlineStatus = false;
      room.roomData.member.forEach((item, i) => {
        if (item._id.toString() === receiver.toString()) {
          name = item.name;
          onlineStatus = Boolean(item.onlineStatus);
        }
      });

      return (
        <div className="main-message-head">
          <p>{name}</p>
          <p>
            {receiverOnlineStatus === null
              ? onlineStatus
                ? "On"
                : "Off"
              : receiverOnlineStatus
              ? "On"
              : "Off"}
          </p>
          <p>...</p>
        </div>
      );
    } else return "";
  };

  //create dsiplay load more button
  const displayLoadMoreButton = () => {
    if (!chatHistory.loading) {
      if (!chatHistory.lastChat) {
        return (
          <div className="btn-load-more">
            <button
              onClick={() => {
                loadOlderChat();
              }}
            >
              Load More
            </button>
          </div>
        );
      }
    }
    return "";
  };

  const displayChatMessage = (message, chatType = "new") => {
    return message.map((item, i) => (
      <div className="each-message-public-wrapper">
        <div className="each-message-public-container">
          <div className="each-message-public-head">
            {/* Avatar */}
            <div>
              <img
                src={item.from.avatar ? item.from.avatar : ""}
                alt="avatar"
              />
            </div>

            {/* Nama */}
            <p>
              {item.to._id.toString() === receiver.toString()
                ? "You"
                : item.from.name}
            </p>

            {/* Tanggal Chat */}
            <p>{formatRelative(new Date(item.created_at), new Date())}</p>

            {/* Read Status */}
            {item.to._id === receiver ? (
              <p>
                <ChromeReaderModeIcon
                  className={`readed-${item._id}`}
                  // style={{ color: purple[400] }}
                  color={item.readed ? "primary" : "disabled"}
                  fontSize="medium"
                />
              </p>
            ) : (
              ""
            )}

            {/* set read status true */}
            {item.readed === true
              ? ""
              : item.to._id === receiver
              ? ""
              : setReadStatus(item._id, chatType, i)}
          </div>
          <div className="each-message-public-content">
            {/* print Message */}
            {item.message_type == "image" ? (
              <img width="100%" src={item.message}></img>
            ) : (
              item.message
            )}

            {/* set position for scroll after load more clicked */}
            {scrollPos == item._id ? <div ref={messagesStartRef} /> : ""}
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (receiver) {
      dispatch(getChatRoomAct(receiver));
      return () => {
        startServer("disconnect");
      };
    }
  }, []);

  useEffect(() => {
    if (loadMore && !scrollActive) {
      scrollToTop();
    }
    if (!loadMore && scrollActive) {
      scrollToBottom();
    }
  });

  if (!receiver) {
    return (
      <div className="main-message-container">
        <div className="main-message-wrapper">
          <div className="main-message-head">
            <p>Choose User</p>
            <p>Offline</p>
            <p>...</p>
          </div>
          <div className="empty-line"></div>

          <form className="textarea-wrapper" method="post">
            <textarea
              wrap="soft"
              type="text"
              name="message"
              id="message"
              placeholder="Write a message"
              defaultValue={""}
            />
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
                    variant="contained"
                    component="span"
                    startIcon={<ImageOutlinedIcon />}
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
    );
  } else
    return (
      <>
        {alert.alert ? <FlashMessage /> : ""}
        <div className="main-message-container">
          <div className="main-message-wrapper">
            {/* Start server after room loaded */}
            {room.loading ? "" : startServer(room.roomData._id)}

            {/* display receiver message Profile info */}
            {displayChatName()}

            <div className="content-message-wrapper">
              {/* <div className="empty-line"></div> */}
              {displayLoadMoreButton()}

              {chatHistory.loading ? (
                "waiting history chat "
              ) : chatHistory.message.length > 0 ? (
                ""
              ) : (
                <div className="empty-line"></div>
              )}

              {/* print isi load older chat */}
              {printOlderChat()}

              {/* display history message */}
              {chatHistory.loading
                ? "waiting history chat "
                : displayChatMessage(chatHistory.message, "history")}

              {/* display new message entered */}
              {displayChatMessage(chatMessage)}

              <div ref={messagesEndRef}></div>
            </div>
            <div className="chat-image-container">
              <div>{}</div>
            </div>
            <form className="textarea-wrapper">
              <textarea
                wrap="soft"
                type="text"
                name="message"
                id="message"
                placeholder="Write a message"
                defaultValue={""}
                value={newMessage}
                onChange={handleNewMessageChange}
              />
              <div className="message-btn">
                <div className="message-btn-upload">
                  <Button
                    className="img-button"
                    variant="contained"
                    component="span"
                    startIcon={<ImageOutlinedIcon />}
                    onClick={showModal}
                  >
                    Image
                  </Button>
                  {displayModal()}
                </div>
                <div className="message-btn-send">
                  <Button
                    endIcon={<SendIcon>send</SendIcon>}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default MainContentMessage;

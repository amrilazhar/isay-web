import React, { useEffect, useRef, useState } from "react";
import "./style/contentNotification.css";
import { Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { notificationData } from "../../redux/actions";
import moment from "moment";
import socketIOClient from "socket.io-client";
import Skeleton from "@material-ui/lab/Skeleton";
import jwt_decode from "jwt-decode";
import { authHeader } from "../../helpers";

const ContentNotification = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [notifCount, setNotifCount] = useState(0);
  let tempCount = 0;
  const socketRefNot = useRef();
  const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";

  //get profile id from token
  let token = authHeader().Authorization.replace("Bearer ", "");
  let decodedToken = jwt_decode(token);

  //pagination
  const handlePagination = (event, value) => {
    const page = value;
    setPage(value);
    dispatch(notificationData.getNotificationData(page, limit));
  };

  // get notif
  useEffect(() => {
    dispatch(notificationData.getNotificationData(page, limit));

    if (socketRefNot.current === undefined) {
      socketRefNot.current = socketIOClient(SOCKET_SERVER_URL, {
        transports: ["websocket"],
        path: "/socket",
        upgrade: false,
      });

      socketRefNot.current.removeAllListeners("notif:" + decodedToken.profile);
      socketRefNot.current.on("notif:" + decodedToken.profile, (data) => {
        tempCount = tempCount + 1;
        setNotifCount(tempCount);
      });

      return () => {
        socketRefNot.current.disconnect();
      };
    }
  }, []);

  const notifReaded = (notifID) => {
    socketRefNot.current.emit("readNotif", {
      notif_id: notifID,
    });
  };

  const notificationUpdate = useSelector((state) => state.notificationData);

  // handle date
  const convertDate = (dates) => {
    const newDate = new Date(dates);
    const today = moment(newDate);
    return today.fromNow();
  };

  // handle type
  const showType = (type) => {
    switch (type) {
      case "post_comment":
        return "Commented on Your Status";
      case "like_status":
        return "Like Your Status";
      default:
        return "Doing Something";
    }
  };

  return (
    <>
      {notifCount === 0 ? (
        ""
      ) : (
        <div className="main-container" style={{ marginBottom: "1rem" }}>
          <div className="notif-container">
            <div
              className="notif-wrapper"
              style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: "1rem" }}
            >
              <h4>New Notif</h4>
              <div
                style={{
                  fontWeight: 600,
                  color: "var(--white)",
                  backgroundColor: "var(--mainPurple)",
                  borderRadius: "0.8rem",
                  fontSize: "small",
                  padding: "0.5rem 0",
                  textAlign: "center",
                  flex: "1 1 15%",
                }}
              >
                <p>{notifCount}</p>
              </div>
              <button> reload page</button>
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        {notificationUpdate.loading ? (
          <>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        className="circle1"
                        animation="wave"
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      className="rect1"
                      animation="wave"
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      className="rect2"
                      animation="wave"
                    />
                    <Skeleton
                      variant="rect"
                      className="rect3"
                      animation="wave"
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div className="img-sub-notif-load">
                        <Skeleton
                          variant="circle"
                          animation="wave"
                          className="circle2"
                        />
                        <Skeleton
                          variant="rect"
                          className="rect4"
                          animation="wave"
                        />
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          className="rect5"
                        />
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          className="rect6"
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        className="rect7"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider variant="middle" />
            </div>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        className="circle1"
                        animation="wave"
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      className="rect1"
                      animation="wave"
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      className="rect2"
                      animation="wave"
                    />
                    <Skeleton
                      variant="rect"
                      className="rect3"
                      animation="wave"
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div className="img-sub-notif-load">
                        <Skeleton
                          variant="circle"
                          animation="wave"
                          className="circle2"
                        />
                        <Skeleton
                          variant="rect"
                          className="rect4"
                          animation="wave"
                        />
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          className="rect5"
                        />
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          className="rect6"
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        className="rect7"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider variant="middle" />
            </div>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        className="circle1"
                        animation="wave"
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      className="rect1"
                      animation="wave"
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      className="rect2"
                      animation="wave"
                    />
                    <Skeleton
                      variant="rect"
                      className="rect3"
                      animation="wave"
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div className="img-sub-notif-load">
                        <Skeleton
                          variant="circle"
                          animation="wave"
                          className="circle2"
                        />
                        <Skeleton
                          variant="rect"
                          className="rect4"
                          animation="wave"
                        />
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          className="rect5"
                        />
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          className="rect6"
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        className="rect7"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider variant="middle" />
            </div>
            <div className="pagi-load">
              <Skeleton
                className="notification-pagination-load"
                animation="wave"
                variant="circle"
              />
              <Skeleton
                className="notification-pagination-load"
                animation="wave"
                variant="circle"
              />
              <Skeleton
                className="notification-pagination-load"
                animation="wave"
                variant="circle"
              />
            </div>
          </>
        ) : notificationUpdate.error ? (
          <h1>Error</h1>
        ) : (
          <>
            <div className="notif-container">
              {notificationUpdate?.notification?.data.map((data) => (
                <>
                  <div className="notif-wrapper">
                    <div className="notif-header">
                      <div className="head-upper">
                        <div className="head-upper-bg">
                          <img src={data.from.avatar} alt="content" />
                        </div>
                        <h4>{data.from.name}</h4>
                      </div>
                      <div className="head-bottom">
                        <p>{showType(data.type)}</p>
                        <p>
                          {data?.created_at === undefined
                            ? "not found"
                            : convertDate(data?.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="sub-container">
                      {data.status_id === null ? (
                        <div className="sub-wrapper">
                          <div className="sub-content">
                            <p>You have delete your status</p>
                          </div>
                        </div>
                      ) : (
                        <div className="sub-wrapper">
                          <div className="sub-header">
                            <div>
                              <div className="img-sub-notif">
                                <img src={data.to.avatar} alt="sub-content" />
                              </div>
                              <h4>{data.to.name}</h4>
                            </div>
                            <div className="target">
                              <p>
                                {data.status_id?.created_at === undefined
                                  ? "not found"
                                  : convertDate(data?.status_id?.created_at)}
                              </p>
                              <p>{data.status_id.interest[0].interest}</p>
                            </div>
                          </div>
                          <div className="sub-content">
                            <p>{data.status_id?.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Divider
                    variant="middle"
                    style={{ backgroundColor: "var(--border)", height: "2px" }}
                  />
                  {data.readed === true ? "" : notifReaded(data._id)}
                </>
              ))}
            </div>
            <Pagination
              onChange={handlePagination}
              count={`${notificationUpdate?.notification?.totalPages}`}
              page={page}
              color="primary"
              className="notification-pagination"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ContentNotification;

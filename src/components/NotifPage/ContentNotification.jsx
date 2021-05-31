import React, { useEffect, useRef, useState } from "react";
import "./style/contentNotification.css";
import { Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { notificationData } from "../../redux/actions";
import moment from "moment";
import socketIOClient from "socket.io-client";
import Skeleton from "@material-ui/lab/Skeleton";

const ContentNotification = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const socketRef = useRef();
  const SOCKET_SERVER_URL = "https://isay.gabatch11.my.id";

  //practice berhasil
  //ask mas amril format waktunya 24 jam kah
  // const date = "2021-05-28T16:16:00.000Z";
  // 2021-05-27063639.182
  // const newDate = date.replace(/[a-z]/gi, " ").slice(0, -5);
  // const today = moment(newDate);
  // console.log("today", today.fromNow());

  //pagination

  const handlePagination = (event, value) => {
    const page = value;
    console.log("page", page);
    setPage(value);
    dispatch(notificationData.getNotificationData(page, limit));
  };
  console.log("page", page);

  // get notif
  useEffect(() => {
    dispatch(notificationData.getNotificationData(page, limit));

    if (socketRef.current === undefined) {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        transports: ["websocket"],
        path: "/socket",
        upgrade: false,
      });
    }
  }, []);

  const notifReaded = (notifID) => {
    socketRef.current.emit("readNotif", {
      notif_id: notifID,
    });
  };

  const notificationUpdate = useSelector((state) => state.notificationData);
  console.log("notificationUpdate", notificationUpdate);

  // handle name
  const convertDate = (dates) => {
    const newDate = new Date(dates);
    const today = moment(newDate);
    console.log("today", today.fromNow());
    return today.fromNow();
  };

  return (
    <>
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
                        width={"60px"}
                        height={"60px"}
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      width={"170px"}
                      height={"25px"}
                      style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      width={"230px"}
                      height={"25px"}
                      style={{ margin: 10, borderRadius:"10px" }}
                    />
                    <Skeleton
                      variant="rect"
                      width={"100px"}
                      height={"25px"}
                      style={{ marginLeft: "auto", borderRadius:"10px" }}
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div>
                        <div className="img-sub-notif-load">
                          <Skeleton
                            variant="circle"
                            width={"60px"}
                            height={"60px"}
                          />
                        </div>
                        <div>
                          <Skeleton
                            variant="rect"
                            width={"160px"}
                            height={"25px"}
                            style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                          />
                        </div>
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          width={"160px"}
                          height={"25px"}
                          style={{ marginLeft: "4.3rem", borderRadius:"10px" }}
                        />
                        <Skeleton
                          variant="rect"
                          width={"100px"}
                          height={"25px"}
                          style={{ marginLeft: "auto", borderRadius:"10px" }}
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        width="100%"
                        height="50px"
                        style={{ marginTop: "1rem", marginBottom: "1rem", borderRadius:"10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        width={"60px"}
                        height={"60px"}
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      width={"170px"}
                      height={"25px"}
                      style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      width={"230px"}
                      height={"25px"}
                      style={{ margin: 10, borderRadius:"10px" }}
                    />
                    <Skeleton
                      variant="rect"
                      width={"100px"}
                      height={"25px"}
                      style={{ marginLeft: "auto", borderRadius:"10px" }}
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div>
                        <div className="img-sub-notif-load">
                          <Skeleton
                            variant="circle"
                            width={"60px"}
                            height={"60px"}
                          />
                        </div>
                        <div>
                          <Skeleton
                            variant="rect"
                            width={"160px"}
                            height={"25px"}
                            style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                          />
                        </div>
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          width={"160px"}
                          height={"25px"}
                          style={{ marginLeft: "4.3rem", borderRadius:"10px"}}
                        />
                        <Skeleton
                          variant="rect"
                          width={"100px"}
                          height={"25px"}
                          style={{ marginLeft: "auto", borderRadius:"10px" }}
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        width="100%"
                        height="50px"
                        style={{ marginTop: "1rem", marginBottom: "1rem", borderRadius:"10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        width={"60px"}
                        height={"60px"}
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      width={"170px"}
                      height={"25px"}
                      style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      width={"230px"}
                      height={"25px"}
                      style={{ margin: 10, borderRadius:"10px" }}
                    />
                    <Skeleton
                      variant="rect"
                      width={"100px"}
                      height={"25px"}
                      style={{ marginLeft: "auto", borderRadius:"10px" }}
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div>
                        <div className="img-sub-notif-load">
                          <Skeleton
                            variant="circle"
                            width={"60px"}
                            height={"60px"}
                          />
                        </div>
                        <div>
                          <Skeleton
                            variant="rect"
                            width={"160px"}
                            height={"25px"}
                            style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                          />
                        </div>
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          width={"160px"}
                          height={"25px"}
                          style={{ marginLeft: "4.3rem", borderRadius:"10px" }}
                        />
                        <Skeleton
                          variant="rect"
                          width={"100px"}
                          height={"25px"}
                          style={{ marginLeft: "auto", borderRadius:"10px" }}
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        width="100%"
                        height="50px"
                        style={{ marginTop: "1rem", marginBottom: "1rem", borderRadius:"10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        width={"60px"}
                        height={"60px"}
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      width={"170px"}
                      height={"25px"}
                      style={{ marginTop: 16, marginLeft: 10,borderRadius:"10px" }}
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      width={"230px"}
                      height={"25px"}
                      style={{ margin: 10, borderRadius:"10px" }}
                    />
                    <Skeleton
                      variant="rect"
                      width={"100px"}
                      height={"25px"}
                      style={{ marginLeft: "auto", borderRadius:"10px" }}
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div>
                        <div className="img-sub-notif-load">
                          <Skeleton
                            variant="circle"
                            width={"60px"}
                            height={"60px"}
                          />
                        </div>
                        <div>
                          <Skeleton
                            variant="rect"
                            width={"160px"}
                            height={"25px"}
                            style={{ marginTop: 16, marginLeft: 10,borderRadius:"10px" }}
                          />
                        </div>
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          width={"160px"}
                          height={"25px"}
                          style={{ marginLeft: "4.3rem", borderRadius:"10px" }}
                        />
                        <Skeleton
                          variant="rect"
                          width={"100px"}
                          height={"25px"}
                          style={{ marginLeft: "auto", borderRadius:"10px" }}
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        width="100%"
                        height="50px"
                        style={{ marginTop: "1rem", marginBottom: "1rem", borderRadius:"10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="notif-container-load">
              <div className="notif-wrapper-load">
                <div className="notif-header-load">
                  <div className="head-upper-load">
                    <div className="head-upper-bg-load">
                      <Skeleton
                        variant="circle"
                        width={"60px"}
                        height={"60px"}
                      />
                    </div>
                    <Skeleton
                      variant="rect"
                      width={"170px"}
                      height={"25px"}
                      style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                    />
                  </div>
                  <div className="head-bottom-load">
                    <Skeleton
                      variant="rect"
                      width={"230px"}
                      height={"25px"}
                      style={{ margin: 10, borderRadius:"10px" }}
                    />
                    <Skeleton
                      variant="rect"
                      width={"100px"}
                      height={"25px"}
                      style={{ marginLeft: "auto", borderRadius:"10px" }}
                    />
                  </div>
                </div>
                <div className="sub-container-load">
                  <div className="sub-wrapper-load">
                    <div className="sub-header-load">
                      <div>
                        <div className="img-sub-notif-load">
                          <Skeleton
                            variant="circle"
                            width={"60px"}
                            height={"60px"}
                          />
                        </div>
                        <div>
                          <Skeleton
                            variant="rect"
                            width={"160px"}
                            height={"25px"}
                            style={{ marginTop: 16, marginLeft: 10, borderRadius:"10px" }}
                          />
                        </div>
                      </div>
                      <div className="target-load">
                        <Skeleton
                          variant="rect"
                          width={"160px"}
                          height={"25px"}
                          style={{ marginLeft: "4.3rem", borderRadius:"10px" }}
                        />
                        <Skeleton
                          variant="rect"
                          width={"100px"}
                          height={"25px"}
                          style={{ marginLeft: "auto", borderRadius:"10px" }}
                        />
                      </div>
                    </div>
                    <div className="sub-content-load">
                      <Skeleton
                        variant="rect"
                        width="100%"
                        height="50px"
                        style={{ marginTop: "1rem", marginBottom: "1rem", borderRadius:"10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </>
        ) : notificationUpdate.error ? (
          <h1>Error</h1>
        ) : (
          <>
            <div className="notif-container">
              {notificationUpdate?.notification?.data.map((data) => (
                <>
                  {data.status_id === null ? (
                    ""
                  ) : (
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
                            <p>{data.type}</p>
                            <p>
                              {data?.created_at === undefined
                                ? "not found"
                                : convertDate(data?.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="sub-container">
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
                              <p>{data.status_id.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Divider />
                      {data.readed._id ? "" : notifReaded()}
                    </>
                  )}
                </>
              ))}
            </div>
          </>
        )}
      </div>
      <Pagination
        onChange={handlePagination}
        count={`${notificationUpdate?.notification?.totalPages}`}
        page={page}
        color="primary"
        className="notification-pagination"
      />
    </>
  );
};

export default ContentNotification;

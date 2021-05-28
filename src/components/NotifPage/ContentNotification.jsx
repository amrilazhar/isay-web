import React, { useEffect, useState } from "react";
import "./style/contentNotification.css";
import { Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { notificationData } from "../../redux/actions";
import moment from "moment";

const ContentNotification = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

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
  }, []);

  const notificationUpdate = useSelector((state) => state.notificationData);
  console.log("notificationUpdate", notificationUpdate);

  // handle name
  const convertDate = (dates) => {
    const newDate = dates.replace(/[a-z]/gi, " ").slice(0, -5);
    const today = moment(newDate);
    console.log("today", today.fromNow());
    return today.fromNow();
  };

  return (
    <>
      <div className="main-container">
        {notificationUpdate.loading ? (
          <h3>loading...</h3>
        ) : notificationUpdate.error ? (
          <h1>Error</h1>
        ) : (
          <>
            <div className="notif-container">
              {notificationUpdate?.notification?.data.map((data) => (
                <>
                  <div className="notif-wrapper">
                    <div className="notif-header">
                      <img src={data.from.avatar} alt="content" />
                      <h4>{data.from.name}</h4>
                      <p>{data.type}</p>
                      <p>{convertDate(data.created_at)}</p>
                    </div>
                    <div className="sub-container">
                      <div className="sub-wrapper">
                        <div className="sub-header">
                          <img src={data.to.avatar} alt="sub-content" />
                          <h4>{data.to.name}</h4>
                          <p>{convertDate(data.status_id.created_at)}</p>
                          <p>{data.status_id.interest[0]}</p>
                        </div>
                        <div className="sub-content">
                          <p>{data.status_id.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider />
                </>
              ))}
            </div>
          </>
        )}
      </div>
      <Pagination
        onChange={handlePagination}
        count={`${notificationData?.data?.totalPages}`}
        page={page}
        color="primary"
        className="notification-pagination"
      />
    </>
  );
};

export default ContentNotification;

import axios from "axios";
import React, { useEffect, useState } from "react";

const GetNotifications = () => {
  const [userNotifications, setUserNotifications] = useState([]);
  const cust_id = localStorage.getItem("cust_id");
  useEffect(() => {
    axios
      .post(
        `https://7g5umofmvkhvkj4bblhly46uay0eczju.lambda-url.us-east-1.on.aws/`,
        { 
            user_id: cust_id 
        }
      )
      .then((response) => {
        setUserNotifications(response.data);
      });
  }, []);

  return (
    <div>
      <h2 style={{ margin: "15px" }}>User Notifications</h2>
      {userNotifications.map((userNotification) => {
        return (
          <div className="card mb-3" style={{ margin: "15px" }}>
            <div className="row no-gutters" style={{ margin: "5px" }} >
              <div className="col-md-15" style={{ margin: "5px" }}>{userNotification}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetNotifications;

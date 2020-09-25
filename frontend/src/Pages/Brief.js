import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import MY_SERVICE from "../services";

const { getUserInfo } = MY_SERVICE;

function Brief() {
  const { user } = useContext(MyContext);
  const [logs, setlogs] = useState(null);

  useEffect(() => {
    async function fetchInfo() {
      // const {
      //   data: { user },
      // } = await getUserInfo();
      const { data } = await getUserInfo();
      console.log(data);
      // setlogs(data);
      // console.log(logs);
    }
    fetchInfo();
  }, []);

  return user ? (
    user.role === "employer" ? (
      <div>
        <h2>Brief: Private Page Employer</h2>
      </div>
    ) : (
      <div>
        <img
          style={{ width: "5rem", borderRadius: "50%" }}
          src={user.photo}
          alt="UserPhoto"
        />
        <br />
        <br />
        <h2>{user.email}</h2>
        <Button to="/employers">Add Employer</Button>
        <br />
        <br />
        <h3>Recent Logs</h3>
        <ul>
          {logs ? (
            logs.map((log, ind) => <li key={ind}>{log.location}</li>)
          ) : (
            <p>Loading</p>
          )}
        </ul>
      </div>
    )
  ) : (
    <Redirect to="/login" />
  );
}

export default Brief;

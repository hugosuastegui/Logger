import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Redirect, Link } from "react-router-dom";
import { Button, Modal } from "antd";
import MY_SERVICE from "../services";

const { getUserInfo, getAllEmployers, assignEmployer } = MY_SERVICE;

const Brief = () => {
  const [logs, setlogs] = useState(null);
  const [employers, setemployers] = useState([]);
  const [modal, setmodal] = useState(false);
  const { user } = useContext(MyContext);
  console.log(user);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabLogs },
        },
      } = await getUserInfo();
      console.log(collabLogs);
      setlogs(collabLogs);
    }
    fetchInfo();
  }, []);

  async function addEmployer(employerId) {}

  return user ? (
    <div>
      <img
        style={{ width: "5rem", borderRadius: "50%" }}
        src={user.photo}
        alt="UserPhoto"
      />
      <br />
      <br />
      <h2>{user.email}</h2>
      {/* <Button onClick={() => setmodal(true)}>Add Employer</Button>
      <Modal title="Basic Modal" visible={modal} onCancel={setmodal(false)}>
        <h2>Employers Listed in the App</h2>
        {employers.length !== 0 ? (
          <ul>
            {employers.map((employer, ind) => (
              <li key={ind}>
                <Link onClick={() => addEmployer(employer.id)}>
                  {employer.email}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h3>No listed Employers yet :(</h3>
        )}
      </Modal> */}
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
  ) : (
    <p>Loading</p>
  );
};

export default Brief;

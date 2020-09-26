import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Redirect, Link } from "react-router-dom";
import { Button, Modal } from "antd";
import MY_SERVICE from "../services";

const { getUserInfo, getAllEmployers, requestEmployer } = MY_SERVICE;

const Brief = () => {
  const [logs, setlogs] = useState(null);
  const [employers, setemployers] = useState([]);
  const [modal, setmodal] = useState(false);
  const { user } = useContext(MyContext);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabLogs },
        },
      } = await getUserInfo();
      setlogs(collabLogs);
    }

    async function fetchEmployers() {
      const {
        data: { user },
      } = await getAllEmployers();
      setemployers(user);
    }

    fetchEmployers();
    fetchInfo();
  }, []);

  async function addEmployer(el) {
    await requestEmployer(el._id);
    setmodal(false);
    console.log(modal);
  }

  return user ? (
    user.role === "employer" ? (
      <h1>Employer</h1>
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
        <Button onClick={() => setmodal(true)}>Add Employer</Button>
        <Modal
          title="Basic Modal"
          visible={modal}
          onCancel={() => setmodal(false)}
          footer={
            <Button type="primary" danger onClick={() => setmodal(false)}>
              Cancel
            </Button>
          }
        >
          <h2>Employers Listed in the App</h2>
          {employers.length !== 0 ? (
            <ul>
              {employers.map((el, ind) => (
                <li key={ind}>
                  <Link onClick={() => addEmployer(el)}>{el.email}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <h3>No listed Employers yet :(</h3>
          )}
        </Modal>
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
};

export default Brief;

import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import MY_SERVICE from "../services/index";
import { Redirect } from "react-router-dom";
import { Card, Tag } from "antd";

const { getUserInfo } = MY_SERVICE;

function ShowPoIs() {
  const [pois, setpois] = useState([]);
  const { user } = useContext(MyContext);

  console.log(user);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { employerPoIs },
        },
      } = await getUserInfo();
      setpois(employerPoIs);
    }
    fetchInfo();
  }, []);

  return user ? (
    user.role === "employer" ? (
      <div>
        <h1>Show all Pois</h1>
        {pois.map((poi, ind) => (
          <Card key={ind} title={poi.name} bordered={true}>
            <p>{poi.location}</p>
            <p>{poi.checkinTime}</p>
            <p>Weekdays:</p>
            {poi.weekdays.map((day, ind) => (
              <Tag>{day}</Tag>
            ))}
          </Card>
        ))}
      </div>
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <h1>Loading...</h1>
  );
}

export default ShowPoIs;

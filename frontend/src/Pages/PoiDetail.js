import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Card, Link, Button } from "antd";

function PoiDetail({
  match: {
    params: { poiId },
  },
  history,
}) {
  const [poi, setpoi] = useState(null);
  const [collaborators, setcollaborators] = useState(initialState);
  const { user } = useContext(MyContext);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabs },
        },
      } = await getUserInfo();
      setcollaborators(collabs);
    }
    fetchInfo();
  }, []);

  return (
    <div>
      <h2>Assign Collabs</h2>
      {collaborators.map((el, ind) => (
        <Card title={el.name} key={el._id}>
          <p>{el.email}</p>
          <Switch></Switch>
        </Card>
      ))}
    </div>
  );
}

export default PoiDetail;

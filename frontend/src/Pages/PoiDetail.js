import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Card, Link, Button } from "antd";
import MY_SERVICE from "../services/index";
import Form from "antd/lib/form/Form";

const { getPoi } = MY_SERVICE;

function PoiDetail({
  match: {
    params: { poiId },
  },
  history,
}) {
  const [poi, setpoi] = useState(null);
  const [collaborators, setcollaborators] = useState(initialState);
  const { user } = useContext(MyContext);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabs },
        },
      } = await getUserInfo();
      setcollaborators(collabs);
    }

    async function fetchPoi() {
      const gottenPoi = await getPoi(poiId);
      setpoi(gottenPoi);
    }

    fetchPoi();
    fetchInfo();
  }, []);

  return (
    <div>
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          value={poi.name}
          onChange={(e) => setpoi(poi.e.taget.value)}
        ></input>
        <label for="location">Location</label>
        <input
          type="text"
          name="location"
          value={poi.location}
          onChange={(e) => setpoi(poi.e.taget.value)}
        ></input>
        <label for="checkinTime">CheckIn Time</label>
        <input
          type="text"
          name="checkinTime"
          value={poi.checkinTime}
          onChange={(e) => setpoi(poi.e.taget.value)}
        ></input>
        <label for="tolerance">Tolerance</label>
        <input
          type="text"
          name="tolerance"
          value={poi.tolerance}
          onChange={(e) => setpoi(poi.e.taget.value)}
        ></input>
        {/* <fieldset>
          <legend>Weekdays:</legend>
          <p></p>
        </fieldset> */}
      </form>
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

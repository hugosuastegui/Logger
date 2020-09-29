import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import { Card, Avatar, Button, Select } from "antd";
import MY_SERVICE from "../services/index";

const { getUserInfo, updateUser } = MY_SERVICE;

const { Meta } = Card;
const { Option } = Select;

function Collabs() {
  const { user } = useContext(MyContext);
  const [collaborators, setcollaborators] = useState([]);
  const [validatedCollabs, setvalidatedCollabs] = useState();
  const [unvalidatedCollabs, setunvalidatedCollabs] = useState();
  const [employerId, setemployerId] = useState();
  const [toggleValidated, settoggleValidated] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { collabs },
        },
      } = await getUserInfo();

      const {
        data: {
          user: { _id },
        },
      } = await getUserInfo();

      setemployerId(_id);
      setcollaborators(collabs);
      console.log(collaborators);

      const validated = await collaborators.filter((el) => {
        return el.collabValidated;
      });
      const unvalidated = await collaborators.filter((el) => {
        return !el.collabValidated;
      });
      setvalidatedCollabs(validated);
      setunvalidatedCollabs(unvalidated);
    }
    fetchInfo();
  }, []);

  async function acceptCollab(id) {
    let values = { collabValidated: true };
    console.log(id, values);
    // await updateUser(id, values);
  }

  async function denyCollab(id) {
    let values = { collabValidated: false };
    let newCollabs = await collaborators.filter((el) => el._id !== id);
    console.log(newCollabs);
    // await updateUser(id, values);
    // await updateUser(employerId, collaborators);
  }

  async function toggle(value) {
    console.log(value);
    console.log(collaborators);
    console.log(validatedCollabs);
    console.log(unvalidatedCollabs);
  }

  return collaborators && validatedCollabs && unvalidatedCollabs ? (
    <div>
      <h2>Show Collabs</h2>
      <Select placeholder="Show Valid Collabs" onChange={() => toggle()}>
        <Option value={true}>Show Valid Collabs</Option>
        <Option value={false}>Show Pending Requests</Option>
      </Select>
      {toggleValidated ? (
        <div>
          <h1>Validated Collabs</h1>
          {validatedCollabs.map((el, ind) => (
            <Card>
              <Meta
                avatar={<Avatar src={el.photo} />}
                title={el.name}
                description={el.email}
              />
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <h1>Collabs Requests</h1>
          {unvalidatedCollabs.map((el, ind) => (
            <Card
              actions={[
                <Button onClick={() => acceptCollab(el.id)}>Accept</Button>,
                <Button onClick={() => denyCollab(el.id)}>Deny</Button>,
              ]}
            >
              <Meta
                avatar={<Avatar src={el.photo} />}
                title={el.name}
                description={el.email}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div>
      <h2>No Collabs To Show</h2>
      <p>Share code to add</p>
      <strong>{employerId}</strong>
    </div>
  );
}

export default Collabs;

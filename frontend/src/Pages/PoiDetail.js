import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context";
import {
  Card,
  Form,
  Select,
  Input,
  Switch,
  Button,
  TimePicker,
  InputNumber,
} from "antd";
import MY_SERVICE from "../services/index";

const { getPoi, getUserInfo, updatePoi } = MY_SERVICE;
const { Option } = Select;

function PoiDetail({
  match: {
    params: { poiId },
  },
  history,
}) {
  const [poi, setpoi] = useState(null);
  const [collaborators, setcollaborators] = useState();
  const [weekdays, setweekdays] = useState([]);
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
      const {
        data: { poi },
      } = await getPoi(poiId);
      setpoi(poi);
    }

    fetchPoi();
    fetchInfo();
  }, []);

  const addWeekdays = (value) => {
    setweekdays([...weekdays, value]);
  };

  async function editPoi(values) {
    await updatePoi(poi._id, values);
    history.push("/pois");
  }

  return poi ? (
    <div>
      <h2>{poi.name}</h2>
      <Form layout="vertical" name="basic" form={form} onFinish={editPoi}>
        <Form.Item label="Name" name="name">
          <Input placeholder={poi.name} placeholder={poi.name} />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input placeholder={poi.location} />
        </Form.Item>
        <Form.Item label="Check-In Time" name="checkinTime">
          <TimePicker format="HH:mm" minuteStep={5} />
        </Form.Item>
        <Form.Item label="Tolerance (minutes)" name="tolerance">
          <InputNumber min="0" defaultValue="5" placeholder={poi.tolerance} />
        </Form.Item>
        <Form.Item label="Weekdays" name="weekdays">
          <Select
            mode="multiple"
            placeholder="Weekdays"
            name="weekdays"
            onChange={addWeekdays}
          >
            <Option key="1" value="Mon">
              Mon
            </Option>
            <Option key="2" value="Tue">
              Tue
            </Option>
            <Option key="3" value="Wed">
              Wed
            </Option>
            <Option key="4" value="Thu">
              Thu
            </Option>
            <Option key="5" value="Fri">
              Fri
            </Option>
            <Option key="6" value="Sat">
              Sat
            </Option>
            <Option key="7" value="Sun">
              Sun
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <br />
      {collaborators ? (
        <>
          <h2>Assign Collabs</h2>
          {collaborators.map((el) => (
            <Card title={el.name} key={el._id}>
              <p>{el.email}</p>
              <Switch></Switch>
            </Card>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default PoiDetail;

import React, { useState } from "react";
import { Form, Select, Input, Button, TimePicker, InputNumber } from "antd";
import MY_SERVICE from "../services/index";

const { createPoi } = MY_SERVICE;
const { Option } = Select;

function NewPoi({ history }) {
  const [weekdays, setweekdays] = useState([]);
  const [form] = Form.useForm();

  const addWeekdays = (value) => {
    setweekdays([...weekdays, value]);
  };

  async function newPoi(values) {
    await createPoi(values);
    history.push("/pois");
  }

  return (
    <div>
      <h2>New Poi</h2>
      <Form layout="vertical" name="basic" form={form} onFinish={newPoi}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="Check-In Time" name="checkinTime">
          <TimePicker format="HH:mm" minuteStep={5} />
        </Form.Item>
        <Form.Item label="Tolerance (minutes)" name="tolerance">
          <InputNumber min="0" defaultValue="5" />
        </Form.Item>
        <Form.Item label="Weekdays" name="weekdays">
          <Select mode="multiple" name="weekdays" onChange={addWeekdays}>
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
    </div>
  );
}

export default NewPoi;

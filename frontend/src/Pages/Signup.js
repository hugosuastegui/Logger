import React, { useContext } from "react";
import { Form, Input, Button, Select } from "antd";
import MY_SERVICE from "../services";
import { MyContext } from "../context.js";
const { signup, login } = MY_SERVICE;

const { Option } = Select;

function Signup({ history }) {
  const [form] = Form.useForm();
  const { setCtxUser } = useContext(MyContext);

  async function signupProcess(values) {
    await signup(values);
    const {
      data: { user },
    } = await login(values);
    delete user.password;
    delete user.hash;
    delete user.salt;
    setCtxUser(user);
    history.push("/");
  }

  return (
    <div>
      <h2>Welcome!</h2>
      <h3>Please Sign Up</h3>
      <Form layout="vertical" name="basic" form={form} onFinish={signupProcess}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Repeat Password"
          name="repeatedPassword"
          rules={[{ required: true, message: "Repeat password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Select defaultValue="Employer">
            <Option value="true">Employer</Option>
            <Option value="false">Collaborator</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;

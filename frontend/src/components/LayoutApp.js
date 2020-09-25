import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content, Footer } = Layout;

function LayoutApp({ children }) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/signup">SignUp</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/login">LogIn</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <div className="logo">
            <h2 style={{ color: "white" }}>LOGGER</h2>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;

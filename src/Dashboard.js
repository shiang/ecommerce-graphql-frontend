import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Input } from "antd";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;

export default class Dashboard extends React.Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Products</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Orders</span>
                </span>
              }
            >
              <Menu.Item key="2">New Orders</Menu.Item>
              <Menu.Item key="3">Order History</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton
              style={{
                width: "320px",
                height: "31px",
                float: "left",
                margin: "16px 24px 16px 24px"
              }}
            />
          </Header>
          <Content style={{ margin: "10px 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <CreateProductPage />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

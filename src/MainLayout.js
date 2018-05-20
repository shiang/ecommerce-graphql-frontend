import React from "react";
import { Layout, Menu, Icon, Input, Avatar, Badge } from "antd";
import CreateProductPage from "./pages/CreateProductPage";
// import UpdateProductPage from "./pages/UpdateProductPage";
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;

export default class MainLayout extends React.Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{
            minHeight: "100vh",
            overflow: "auto",
            position: "fixed",
            left: 0
          }}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="shop" style={{ fontSize: "20px" }} />
                  <span>Products</span>
                </span>
              }
            >
              <Menu.Item
                key="1"
                onClick={() => {
                  this.props.history.push("/manager/products");
                }}
              >
                All Products
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  this.props.history.push("/manager/products/new");
                }}
              >
                Add Product
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="shopping-cart" style={{ fontSize: "20px" }} />
                  <span>Orders</span>
                </span>
              }
            >
              <Menu.Item key="3">New Orders</Menu.Item>
              <Menu.Item key="4">Order History</Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Icon type="area-chart" style={{ fontSize: "20px" }} />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item
              key="6"
              onClick={() => {
                this.props.history.push("/manager/profile");
              }}
            >
              <Icon type="profile" style={{ fontSize: "20px" }} />
              <span>Profile</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 100 : 200 }}>
          <Header style={{ background: "#fff", width: "100%", position: 'fixed', zIndex: 500 }}>
            <Badge dot >
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
               
              />
            </Badge>
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 74 }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Made with ❤️ by Ryan © 2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

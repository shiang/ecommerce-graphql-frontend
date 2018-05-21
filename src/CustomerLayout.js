import React from "react";
import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import { Search } from './App'
const { Header, Content, Footer } = Layout;


class CustomerLayout extends React.Component {
  render() {
    return <Layout>
        <Header style={{ position: "fixed", width: "100%", zIndex: 500 }}>
          <Avatar icon="user" />
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by Ryan
        </Footer>
      </Layout>;
  }
}

export default CustomerLayout;

import React from "react";
import { Layout, Menu, Breadcrumb, Avatar, Icon, Spin, Popover } from "antd";
import { Image } from "semantic-ui-react";
import { Search } from "./App";
import axios from "axios";
import { Query, Subscription } from "react-apollo";
import { FETCH_CUSTOMER } from "./queries";
import { SUBSCRIBE_CART } from "./subscriptions";
import HeaderLogo from "./image/dot-shop-logo.png";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const CustomerContext = React.createContext();

class CustomerLayout extends React.Component {
  state = {
    customerId: localStorage.getItem("customerId")
  };

  componentDidMount = () => {
    axios({
      method: "get",
      url: "https://ur-shop-graphql-server.now.sh/current_user",
      withCredentials: true
    }).then(res => {
      if (res.data) {
        this.setState(
          {
            customerId: res.data.customer
          },
          () => localStorage.setItem("customerId", res.data.customer)
        );
      }
    });
  };

  logOut = () => {
    localStorage.removeItem("customerId");
  };

  render() {
    const { customerId } = this.state;
    console.log(customerId);

    return (
      <CustomerContext.Provider value={this.state}>
        {!customerId ? (
          <Layout>
            <Header
              style={{
                position: "fixed",
                width: "100%",
                zIndex: 500,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: "5px",
                  margin: "5px"
                }}
              >
                <Link to="/">
                  <Image src={HeaderLogo} alt="logo" height="50px" />
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100px"
                }}
              >
                <Popover
                  placement="bottomRight"
                  title="User menu"
                  content={
                    <Link to="/">
                      <button onClick={this.logOut}>Log in</button>
                    </Link>
                  }
                  trigger="click"
                >
                  <Avatar icon="user" />
                </Popover>
              </div>
            </Header>
            <Content style={{ padding: "0 50px", marginTop: 64 }}>
              <div
                style={{
                  background: "#fff",
                  padding: 24,
                  minHeight: 380
                }}
              >
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Created by Ryan</Footer>
          </Layout>
        ) : (
          <Subscription subscription={SUBSCRIBE_CART}>
            {({ data, loading }) => {
              if (!loading) {
                console.log(data);
              }
              console.log("loading, ", data);

              return (
                <Query
                  query={FETCH_CUSTOMER}
                  variables={{ _id: this.state.customerId }}
                >
                  {({ loading, error, data }) => {
                    if (!loading) {
                      console.log(data);
                      return (
                        <Layout>
                          <Header
                            style={{
                              position: "fixed",
                              width: "100%",
                              zIndex: 500,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                padding: "5px",
                                margin: "5px"
                              }}
                            >
                              <Link to="/">
                                <Image
                                  src={HeaderLogo}
                                  alt="logo"
                                  height="50px"
                                />
                              </Link>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100px"
                              }}
                            >
                              <Popover
                                placement="bottomRight"
                                title="Your cart"
                                content="Item"
                                trigger="click"
                              >
                                <Avatar icon="shopping-cart" />
                              </Popover>
                              <Popover
                                placement="bottomRight"
                                title="User menu"
                                content={
                                  <a href="https://ur-shop-graphql-server.now.sh/logout">
                                    <button onClick={this.logOut}>
                                      Log out
                                    </button>
                                  </a>
                                }
                                trigger="click"
                              >
                                <Avatar icon="user" />
                              </Popover>
                            </div>
                          </Header>
                          <Content style={{ padding: "0 50px", marginTop: 64 }}>
                            <div
                              style={{
                                background: "#fff",
                                padding: 24,
                                minHeight: 380
                              }}
                            >
                              {this.props.children}
                            </div>
                          </Content>
                          <Footer style={{ textAlign: "center" }}>
                            Created by Ryan
                          </Footer>
                        </Layout>
                      );
                    }

                    return <Spin />;
                  }}
                </Query>
              );
            }}
          </Subscription>
        )}
      </CustomerContext.Provider>
    );
  }
}

export default CustomerLayout;

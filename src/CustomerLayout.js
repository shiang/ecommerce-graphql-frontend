import React from "react";
import { Layout, Menu, Breadcrumb, Avatar, Icon, Spin } from "antd";
import { Search } from "./App";
import axios from "axios";
import { Query } from 'react-apollo'
import { FETCH_CUSTOMER } from './queries'
const { Header, Content, Footer } = Layout;

export const CustomerContext = React.createContext();

class CustomerLayout extends React.Component {
  state = {
    customerId: localStorage.getItem("customerId")
  };

  componentDidMount = () => {
    
      axios({
        method: "get",
        url: "https://60ec4565.ngrok.io/current_user",
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

  render() {
    const { customerId } = this.state;
    console.log(customerId)

    return <CustomerContext.Provider value={this.state}>
    {!customerId ? (
        <Layout>
          <Header style={{ position: "fixed", width: "100%", zIndex: 500, textAlign: "right" }}>
            
            <Avatar icon="user" />
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
    ):
    (
          <Query query={FETCH_CUSTOMER} variables={{ _id: this.state.customerId } }>
            {({ loading, error, data }) => {
              if (!loading) {
                console.log(data);
                return <Layout>
                  <Header style={{ position: "fixed", width: "100%", zIndex: 500, textAlign: "right" }}>
                    <Avatar icon="shopping-cart" />
                    <Avatar icon="user" />
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
                </Layout>;
              }

              return <Spin />;
            }}
          </Query>
    )
    }
        
      </CustomerContext.Provider>;
  }
}

export default CustomerLayout;

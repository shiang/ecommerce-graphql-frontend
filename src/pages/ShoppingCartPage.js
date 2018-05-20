import React from "react";
import { Grid, Image, Item } from "semantic-ui-react";
import { Mutation, Query } from "react-apollo";
import { GET_CUSTOMER } from "../queries";
import { Spin, notification, Select } from "antd";
import CartDetail from "../components/CartDetail";

class ShoppingCartPage extends React.Component {
  render() {
    return (
      <Query
        query={GET_CUSTOMER}
        variables={{ _id: "5afbff7792c1fe5ebb23354e" }}
      >
        {({ data, error, loading }) => {
          if (!loading) {
            const { cart } = data.customer;
            return <CartDetail cart={cart} />;
          }
          return <Spin />;
        }}
      </Query>
    );
  }
}

export default ShoppingCartPage;

import React from "react";
import { Query } from "react-apollo";
import { GET_CUSTOMER } from "../queries";
import { Spin } from "antd";
import CartDetail from "../components/CartDetail";
import { CustomerContext } from '../CustomerLayout'

class ShoppingCartPage extends React.Component {
  render() {
    return (
      <CustomerContext.Consumer>
        {({ customerId }) => (
          <Query
            query={GET_CUSTOMER}
            variables={{ _id: customerId }}
          >
            {({ data, error, loading }) => {
              if (!loading) {
                const { cart } = data.customer;
                return <CartDetail cart={cart} />;
              }
              return <Spin />;
            }}
          </Query>
        )}  
      </CustomerContext.Consumer>
    );
  }
}

export default ShoppingCartPage;

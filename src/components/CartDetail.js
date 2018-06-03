import React from "react";
import { List } from "antd";
import CartItemDetail from "./CartItemDetail";
import { Mutation } from "react-apollo";
import { UPDATE_ITEM, REMOVE_ITEM } from "../mutations";
import { GET_CUSTOMER } from "../queries"
import { Spin } from "antd";

const updateCache = (cache, { data: { removeOrderInfo } }) => {

  const { _id } = removeOrderInfo.orderedBy;
  const { customer } = cache.readQuery({
    query: GET_CUSTOMER,
    variables: { 
      _id
    }
  });

  cache.writeQuery({ 
    query: GET_CUSTOMER,   
    data: { 
    customer: {
      __typename: "Customer",
      _id: _id,
      cart: customer.cart.filter(item => item._id !== removeOrderInfo._id)
    } 
  } 
});
};

class CartDetail extends React.Component {

  render() {

    return (
      <List
        loading={false}
        itemLayout="horizontal"
        dataSource={this.props.cart}
        renderItem={item => (
          <Mutation mutation={UPDATE_ITEM}>
            {updateOrderInfo => {
              return (
                <Mutation mutation={REMOVE_ITEM} update={updateCache}>
                  {(removeOrderInfo, { loading }) => {
                    
                    if(loading) {
                      return <Spin />
                    }
                    return (
                      <CartItemDetail
                        item={item}
                        updateOrderInfo={updateOrderInfo}
                        removeOrderInfo={removeOrderInfo}
                      />
                    );
                  }}
                </Mutation>
              );
            }}
          </Mutation>
        )}
      />
    );
  }
}

export default CartDetail;


// refetchQueries = {
//   [{
//     query: GET_CUSTOMER,
//     variables: {
//       _id: this.props.customerId
//     }
//   }]}
import React from "react";
import { Select, InputNumber, List, Avatar, Button, Spin } from "antd";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CartItemDetail from "./CartItemDetail";
import { Mutation } from "react-apollo";
import { UPDATE_ITEM, REMOVE_ITEM } from "../mutations";

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
                <Mutation mutation={REMOVE_ITEM}>
                  {removeOrderInfo => {
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
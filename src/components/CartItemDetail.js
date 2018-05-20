import React from "react";
import { Select, InputNumber, List, Avatar, Button, Spin } from "antd";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class CartItemDetail extends React.Component {
  state = {
    quantity: this.props.item.quantity,
    _id: this.props.item._id
  };

  _handleChange = value => {
    this.setState({
      quantity: value
    });
  };

  updateQuantity = () => {
    this.props.updateOrderInfo({
      variables: {
        _id: this.state._id,
        quantity: this.state.quantity
      }
    });
  };

  removeOrderInfo = () => {
      this.props.removeOrderInfo({
        variables: {
          _id: this.state._id,
          customerId: "5afbff7792c1fe5ebb23354e"
        }
      });
  }

  render() {
    const { item } = this.props;

    return (
      <List.Item
        actions={[
          <Button type="primary" onClick={this.updateQuantity}>
            Update
          </Button>,
          <Button type="danger" onClick={this.removeOrderInfo}>Remove</Button>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar src={item.product.images[0].pictureUrl} size="large" />
          }
          title={
            <Link to="/">
              <h4>{item.product.name}</h4>
            </Link>
          }
          description={item.product.description}
        />

        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div>
              <h5>Quantity: </h5>
            </div>
            <InputNumber
              min={1}
              max={20}
              value={this.state.quantity}
              step={1}
              onChange={this._handleChange}
            />
          </div>

          <div>${item.product.price}</div>
        </div>
      </List.Item>
    );
  }
}

export default CartItemDetail;

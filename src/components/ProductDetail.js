import React from "react";
import { Grid, Image, Item } from "semantic-ui-react";
import { Spin, notification } from "antd";
import { Select, Modal, message } from "antd";
import { CustomerContext } from '../CustomerLayout';

const Option = Select.Option;

class ProductDetail extends React.Component {
  state = {
    name: this.props.product.name,
    images: this.props.product.images,
    category: this.props.product.category,
    price: this.props.product.price,
    description: this.props.product.description,
    quantity: 1
  };

  _handleChange = value => {
    console.log(value);
    this.setState({
      quantity: value,
      visible: false,
      modalText: ""
    });
  };

  handleOk = () => {
    this.props.history.push('/login');
  };

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  addToCart = async(customerId) => {
    //console.log(customerId);  
      if(customerId) {
        await this.props.mutation({
          variables: {
            orderedBy: customerId,
            product: this.props.product._id,
            quantity: this.state.quantity
          }
        });
        message.success("Item successfully added to your shopping cart")
      } else {
        this.setState({
          modalText: "Please log in first to continue shopping.",
          visible: true
        })
      }
  };

  render() {
    const { name, images, description, category, price } = this.state;

    const imageUrl = images.length > 0 ? images[0].pictureUrl : "http://fillmurray.com/200/300";

    const children = [];
    for (let i = 1; i < 11; i++) {
      children.push(<Option key={i}>{i}</Option>);
    }

    return (
      <CustomerContext.Consumer>
        {({ customerId }) => {
          return (
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Image size="medium" src={imageUrl} circular />
                    </Item>
                  </Item.Group>
                </Grid.Column>

                <Grid.Column>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Item.Header as="a">{name}</Item.Header>
                        <Item.Meta>{category}</Item.Meta>
                        <Item.Description>{description}</Item.Description>
                        <Item.Extra>{price}</Item.Extra>
                        <Select
                          defaultValue="1"
                          style={{ width: "120px" }}
                          onChange={this._handleChange}
                        >
                          {children}
                        </Select>
                        <button onClick={() => this.addToCart(customerId)}>Add to Cart</button>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
              </Grid.Row>
              <div>
                <Modal title="Please log in first"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  //confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                >
                  <p>{this.state.modalText}</p>
                </Modal>
              </div>
            </Grid>
          )
        }}
      </CustomerContext.Consumer>
    );
  }
}

export default ProductDetail;

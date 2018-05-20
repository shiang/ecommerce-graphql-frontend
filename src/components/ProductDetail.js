import React from "react";
import { Grid, Image, Item } from "semantic-ui-react";
import { Spin, notification } from "antd";
import { Select } from "antd";

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
      quantity: value
    });
  };

  addToCart = () => {

      this.props.mutation({
          variables: {
              orderedBy: "5afbff7792c1fe5ebb23354e",
              product: this.props.product._id,
              quantity: this.state.quantity
          }
      });
  };

  render() {
    const { name, images, description, category, price } = this.state;

    const children = [];
    for (let i = 1; i < 11; i++) {
      children.push(<Option key={i}>{i}</Option>);
    }

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Item.Group>
              <Item>
                <Item.Image size="medium" src={images[0].pictureUrl} circular />
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
                    <button onClick={this.addToCart}>Add to Cart</button>
                  </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProductDetail;

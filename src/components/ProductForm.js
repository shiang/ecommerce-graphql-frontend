import React from "react";
import { Button, Form, Card, Message, Image } from "semantic-ui-react";
import ImageUpload from "./ImageUpload";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { Carousel } from 'antd';

class ProductForm extends React.Component {
  state = {
    name: "",
    description: "",
    price: 0,
    category: "",
    tags: "",
    vendor: this.props.vendorId,
    images: [],
    loading: false,
    success: false
  };

  componentDidMount = () => {
    if (this.props.product) {
      const {
        name,
        description,
        price,
        category,
        tags,
        vendor,
        images
      } = this.props.product;
      this.setState({
        name,
        description,
        price,
        category,
        tags,
        vendor,
        images
      });
    }
  };

  _handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  _handleSubmit = async e => {
    e.preventDefault();
    const {
      name,
      description,
      price,
      category,
      tags,
      vendor,
      images
    } = this.state;
    this.setState({ loading: true });

    console.log(this.state);
    if (!this.props.product) {
      await this.props.mutation({
        variables: {
          productInput: {
            name,
            description,
            price,
            category,
            tags,
            vendor,
            images
          }
        }
      });
      this.setState(
        {
          loading: false,
          success: true
        },
        () => {
          this.props.history.push("/manager/products");
        }
      );
    } else {
      await this.props.mutation({
        variables: {
          _id: this.props.product._id,
          productInput: {
            name,
            description,
            price,
            category,
            tags,
            images
          }
        }
      });
      this.setState({
        loading: false,
        success: true
      }, () => {
        this.props.history.push('/manager/products')
      });
    }
  };

  setImageId = id => {
    const imageIds = this.state.images.map(image => image._id);
    this.setState({
      images: [...imageIds, id]
    });
  };

  render() {
    console.log(this.props);
    return (
      <Card fluid raised style={{ width: "960px" }} centered>
        <Card.Content>
          <Form
            size="large"
            loading={this.state.loading}
            success={this.state.success}
            onSubmit={this._handleSubmit}
          >
            <Form.Field width="5">
              <label>Name</label>
              <input
                placeholder="Product name"
                name="name"
                onChange={this._handleChange}
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field width="5">
              <label>Description</label>
              <input
                placeholder="Product description"
                name="description"
                onChange={this._handleChange}
                value={this.state.description}
              />
            </Form.Field>
            <Form.Field width="5">
              <label>Price</label>
              <input
                name="price"
                onChange={this._handleChange}
                value={this.state.price}
              />
            </Form.Field>
            <Form.Field width="5">
              <label>Category</label>
              <input
                name="category"
                onChange={this._handleChange}
                value={this.state.category}
              />
            </Form.Field>
            <Form.Field width="5">
              <label>Tags</label>
              <input
                name="tags"
                onChange={this._handleChange}
                value={this.state.tags || ""}
              />
            </Form.Field>
            {this.props.product && (
              <Form.Field width="5">
                <label>Upload Image</label>
                <ImageUpload
                  setImageId={this.setImageId}
                  productId={this.props.product._id}
                />
              </Form.Field>
            )}
            
            <Button type="submit">Submit</Button>
            <Message
              success
              header="Action Completed"
              content="You have successfully created/updated the product!"
            />
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default ProductForm;

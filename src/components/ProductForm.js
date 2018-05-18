import React from "react";
import { Button, Checkbox, Form, Card, Message } from "semantic-ui-react";
//import { Form as AntForm, Icon, Input, Button as AntButton } from "antd";
import Dropzone from 'react-dropzone'
import ImageUpload from './ImageUpload'
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const S3_UPLOAD = gql`
  mutation UploadToS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

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
    if(this.props.product) {
      const { name, description, price, category, tags, vendor, images } = this.props.product;
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
  }

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
      this.setState({
        loading: false,
        success: true
      });
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
            vendor,
            images
          }
        }
      });
      this.setState({
        loading: false,
        success: true
      });
    }
  };

  setImageId = id => {
    this.setState({
      images: [id]
    });
  };

  render() {
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
                value={this.state.tags}
              />
            </Form.Field>
            <Form.Field width="5">
              <label>Upload Image</label>
              <ImageUpload setImageId={this.setImageId} />
            </Form.Field>
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

export default compose(
  graphql(S3_UPLOAD, { name: "uploadImage" })
)(ProductForm);

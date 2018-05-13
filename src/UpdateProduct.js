import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { graphql, compose } from "react-apollo";

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $productInput: ProductInput) {
    updateProduct(_id: $id, productInput: $productInput) {
      _id
      name
      description
      price
      category
    }
  }
`;

const FETCH_PRODUCT = gql`
  query ($id: String!) {
    product(_id: $id) {
      _id
      name
      description
      price
      category
    }
  }
`;

class UpdateProduct extends Component {
  render() {
    if (this.props.data.loading) {
      return <h1>Loading...</h1>;
    }

    const { product } = this.props.data;

    return (
      <div>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();

            this.props.updateProduct({
              variables: {
                  id: `5af62f1318784320764bf6b9`,
                productInput: {
                  name: "AirMax 95 XXII",
                  description: "This is WAY BEYOND cool",
                  price: 189.99,
                  category: "Shoe"
                }
              }
            });
          }}
        >
          <h2>Update Product</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={product.name}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={product.description}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            defaultValue={product.price}
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            id="category"
            defaultValue={product.category}
          />
          <input type="submit" className="btn btn-outline-info" />
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(FETCH_PRODUCT, {
    options: props => ({
        variables: { id: "5af62f1318784320764bf6b9" }
    })
  }),
  graphql(UPDATE_PRODUCT, { name: "updateProduct" })
)(UpdateProduct);

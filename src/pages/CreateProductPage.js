import React from "react";
import ProductForm from "../components/ProductForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      _id
      name
      description
      category
      price
      tags
    }
  }
`;

class CreateProductPage extends React.Component {
  render() {
    return (
      <Mutation mutation={CREATE_PRODUCT}>
        {(createProduct, { data }) => {
          return (
            <ProductForm
              mutation={createProduct}
              vendorId="5afbc86cf662cd4ae63756b5"
            />
          );
        }}
      </Mutation>
    );
  }
}

export default CreateProductPage;

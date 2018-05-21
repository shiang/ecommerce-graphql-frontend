import React from "react";
import ProductForm from "../components/ProductForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ALL_PRODUCTS } from "../queries";
import { TokenContext } from "../components/Auth";

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

const updateCache = (cache, { data: { createProduct } }) => {
  const { allProducts } = cache.readQuery({
    query: ALL_PRODUCTS
  });

  cache.writeQuery({
    query: ALL_PRODUCTS,
    data: { allProducts: allProducts.concat(createProduct) }
  });
};

class CreateProductPage extends React.Component {
  render() {
    return (
      <Mutation mutation={CREATE_PRODUCT} update={updateCache}>
        {(createProduct, { data }) => {
          return (
            <TokenContext.Consumer>
              {({ vendorId }) => {
                console.log(vendorId);
                return (
                  <ProductForm
                    mutation={createProduct}
                    vendorId={vendorId}
                    history={this.props.history}
                  />
                );
              }}
            </TokenContext.Consumer>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateProductPage;

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
      vendor {
        _id
      }
    }
  }
`;

const updateCache = (cache, { data: { createProduct } }) => {
  const { allProducts } = cache.readQuery({
    query: ALL_PRODUCTS
  });

  console.log(createProduct);
  console.log(allProducts);

  cache.writeQuery({
    query: ALL_PRODUCTS,
    data: { allProducts: allProducts.concat(createProduct) }
  });
};

class CreateProductPage extends React.Component {
  render() {
    return (
    <TokenContext.Consumer>
      {({ vendorId }) => {
        console.log(vendorId);
        return (
          <Mutation mutation={CREATE_PRODUCT} update={updateCache}>
            {(createProduct, { data }) => {
              return (
                <ProductForm
                  mutation={createProduct}
                  vendorId={vendorId}
                  history={this.props.history}
                />
              );
            }}
          </Mutation>
        );
      }}
    </TokenContext.Consumer>
    )
  }
}

export default CreateProductPage;

import React from "react";
import ProductForm from "../components/ProductForm";
import { Mutation } from "react-apollo";
import { FETCH_VENDOR } from "../queries";
import { CREATE_PRODUCT } from "../mutations";
import { TokenContext } from "../components/Auth";

const updateCache = (cache, { data: { createProduct } }) => {
  const { vendor } = cache.readQuery({
    query: FETCH_VENDOR,
    variables: {
      _id: createProduct.vendor._id
    }
  });

  const updatedProducts = vendor.products.concat(createProduct);

  cache.writeQuery({
    query: FETCH_VENDOR,
    data: {
      vendor: {
        __typename: "Vendor",
        _id: createProduct.vendor._id,
        products: updatedProducts
      }
    }
  });
};

class CreateProductPage extends React.Component {
  render() {
    return (
      <TokenContext.Consumer>
        {({ vendorId }) => {

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
    );
  }
}

export default CreateProductPage;

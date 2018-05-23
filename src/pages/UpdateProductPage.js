import React from "react";
import ProductForm from "../components/ProductForm";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Spin } from "antd";

const GET_PRODUCT = gql`
  query GetProduct($_id: String!) {
    product(_id: $_id) {
      _id
      name
      description
      price
      category
      images {
        _id
        pictureUrl
      }
      vendor {
        _id
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($_id: String!, $productInput: ProductInput!) {
    updateProduct(_id: $_id, productInput: $productInput) {
      _id
      name
      description
      price
      category
      images {
        _id
        pictureUrl
      }
    }
  }
`;

const updateCache = (cache, { data: { updateProduct } }) => {
  const { product } = cache.readQuery({
    query: GET_PRODUCT,
    variables: { _id: updateProduct._id }
  });


  cache.writeQuery({ query: GET_PRODUCT, data: { product: product } });
};

class UpdateProductPage extends React.Component {
  render() {
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ _id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (!loading) {
            //console.log(data);
            return (
              <Mutation mutation={UPDATE_PRODUCT} update={updateCache}>
                {updateProduct => {
                  return (
                    <ProductForm
                      mutation={updateProduct}
                      product={data.product}
                      history={this.props.history}
                    />
                  );
                }}
              </Mutation>
            );
          }
          return <Spin />;
        }}
      </Query>
    );
  }
}

export default UpdateProductPage;

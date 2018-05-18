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
    }
  }
`;

class UpdateProductPage extends React.Component {
  render() {
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ _id: "5afe421799db150e0954eaf5" }}
      >
        {({ loading, error, data }) => {
          if (!loading) {
            //console.log(data);
            return (
              <Mutation mutation={UPDATE_PRODUCT}>
                {updateProduct => {
                  return (
                    <ProductForm
                      mutation={updateProduct}
                      product={data.product}
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

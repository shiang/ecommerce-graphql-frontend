import React from "react";
import { Grid, Image, Item } from "semantic-ui-react";
import { Mutation, Query } from "react-apollo";
import { GET_PRODUCT } from "../queries";
import { Spin, notification, Select } from "antd";
import ProductDetail from "../components/ProductDetail";
import { ADD_TO_CART } from "../mutations";

class ProductDetailPage extends React.Component {
  render() {
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ _id: this.props.match.params.id }}
      >
        {({ data, error, loading }) => {
          if (!loading) {
            return (
                <Mutation mutation={ADD_TO_CART}>
                    {(addToCart) => {
                        return <ProductDetail product={data.product} mutation={addToCart} />;
                    }}
                </Mutation>
            )
          }
          return <Spin />;
        }}
      </Query>
    );
  }
}

export default ProductDetailPage;

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Button } from "semantic-ui-react";


const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(_id: $id) {
      _id
      name
      description
      price
      category
    }
  }
`;

const ALL_PRODUCTS = gql`
  query {
    allProducts {
      _id
      name
      description
      price
      category
    }
  }
`;

class Product extends Component {
    render() {
        return <Query query={ALL_PRODUCTS}>
            {({ loading, error, data }) => {
              if (!loading) {
                //console.log("Product Data: ", data);
                console.log("Hits props: ", this.props.hit);
                
                return (
                    <div>
                        {data.allProducts.map(product => {
                            const { name, price, description, category, _id } = product;
                            return (
                                <div key={_id}>
                                    <h2>{name}</h2>
                                    <h2>{description}</h2>
                                    <h2>{price}</h2>
                                    <h2>{category}</h2>
                                <Button primary>Primary</Button>
                                </div>
                                
                            )
                        })}
                    </div>
                )
              }

              return <h1>Loading...</h1>;
            }}
          </Query>;
    }
}

export default Product;
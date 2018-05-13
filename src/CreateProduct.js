import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $price: Float!
    $description: String
    $category: String!
  ) {
    createProduct(
      name: $name
      price: $price
      description: $description
      category: $category
    ) {
      _id
      name
      description
      price
      category
    }
  }
`;

class CreateProduct extends Component {
    render() {
        return (
            <Mutation mutation={CREATE_PRODUCT}>
                {(createProduct, { data }) => {
                
                console.log(data);
                return (
                    <div>
                        <form className="form" onSubmit={e => {
                            e.preventDefault();
                            const data = e.target,
                                name = data[0].value,
                                description = data[1].value,
                                price = +data[2].value,
                                category = data[3].value;

                            createProduct({
                                variables: {
                                    name, description, price, category
                                }
                            })
                        }}>
                            <h2>Create Product</h2>
                            <label>Name:</label>
                            <input type="text" name="name" />
                            <label>Description:</label>
                            <input type="text" name="description" />
                            <label>Price:</label>
                            <input type="text" name="price" />
                            <label>Category:</label>
                            <input type="text" name="category" />
                            <input type="submit" className="btn btn-outline-info" />
                        </form>
                    </div>
                )}}
            </Mutation>
        )
    }
}

export default CreateProduct;
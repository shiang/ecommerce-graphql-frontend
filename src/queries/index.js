import gql from "graphql-tag";

export const ALL_PRODUCTS = gql`
  query {
    allProducts {
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

export const PRODUCT_CREATED = gql`
  subscription {
    productCreated {
      _id
      name
    }
  }
`;

export const GET_VENDOR = gql`
  query Vendor($_id: String!) {
    vendor(_id: $_id) {
      _id
      name
      phone
      address
      description
    }
  }
`;

export const CHATROOM_CREATED = gql`
  subscription {
    chatroomCreated {
      _id
      name
      vendor {
        _id
      }
      customer {
        _id
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($_id: String!) {
    product(_id: $_id) {
      _id
      name
      price
      description
      tags
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

export const GET_CUSTOMER = gql`
  query GetCustomer($_id: String!) {
    customer(_id: $_id) {
      _id
      cart {
        _id
        product {
          _id
          name
          images {
            _id
            pictureUrl
          }
          description
          price
        }
        quantity
      }
    }
  }
`;

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

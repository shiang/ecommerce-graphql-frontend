import gql from "graphql-tag";

export const ADD_TO_CART = gql`
  mutation($orderedBy: String!, $product: String!, $quantity: Int!) {
    addToCart(orderedBy: $orderedBy, product: $product, quantity: $quantity) {
      _id
      product {
        _id
        name
      }
      quantity
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($_id: String!, $quantity: Int!) {
    updateOrderInfo(_id: $_id, quantity: $quantity) {
      _id
      quantity
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation RemoveItem($_id: String!, $customerId: String!) {
    removeOrderInfo(_id: $_id, customerId: $customerId) {
      _id
      product {
        _id
      }
      quantity
    }
  }
`;

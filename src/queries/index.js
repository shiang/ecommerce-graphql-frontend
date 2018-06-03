import gql from "graphql-tag";

export const ALL_PRODUCTS = gql`
  query {
    allProducts {
      _id
      name
      description
      price
      vendor {
        _id
      }
      category
      images {
        _id
        pictureUrl
      }
    }
  }
`;

export const FETCH_VENDOR = gql`
  query($_id: String!) {
    vendor(_id: $_id) {
      _id
      products {
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
          vendor {
            _id
          }
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

export const GET_VENDOR_ID = gql`
  query($_id: String!) {
    user(_id: $_id) {
      _id
      vendor {
        _id
      }
    }
  }
`;

export const ALL_VENDORS = gql`
  query {
    allVendors {
      _id
      name
      description
      pictures {
        _id
        pictureUrl
      }
    }
  }
`;

export const FETCH_CUSTOMER = gql`
         query($_id: String!) {
           customer(_id: $_id) {
             _id
             name
             email
             cart {
               _id
               quantity
               product {
                 _id
                 name
                 description
                 images {
                   _id
                   pictureUrl
                 }
               }
             }
           }
         }
       `;

import gql from 'graphql-tag'

export const SUBSCRIBE_CART = gql`
         subscription {
           orderInfoCreated{
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
       `;
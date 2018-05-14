import React, { Component } from "react";
//import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ImageUpload from './ImageUpload';


import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
//import { onError } from "apollo-link-error";
//import { withClientState } from "apollo-link-state";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import Post from './Post';
import PostForm from './PostForm';
import CreateProduct from './CreateProduct';
import UpdateProduct from "./UpdateProduct";
import Product from "./Product";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch/dom";



const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZWZmNGFmZDFhYWIxNjMzMWRjZjU4OSIsImVtYWlsIjoicnlhbkB1c2VyLmNvbSIsIm5hbWUiOiJSeWFuIn0sImlhdCI6MTUyNTk0ODk4NiwiZXhwIjoxNTU3NTA2NTg2fQ.CVaC6B-7b6vvggsiU1T8yF0bqEws3otZaGn70Wktu1g`
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);


const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object._id
  })
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   request: async operation => {
//     //const token = await AsyncStorage.getItem("token");
//     operation.setContext({
//       headers: {
//         authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZWZmNGFmZDFhYWIxNjMzMWRjZjU4OSIsImVtYWlsIjoicnlhbkB1c2VyLmNvbSIsIm5hbWUiOiJSeWFuIn0sImlhdCI6MTUyNTgyMjQ4MCwiZXhwIjoxNTU3MzgwMDgwfQ.WwxT_BJMqG0UH8nzosoabD1dqstTVGkHTawvZDQ979Q`
//       }
//     });
//   }
// });

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
        <div>
          <ImageUpload />
          <PostForm />
          <Post />

          <UpdateProduct />
          <InstantSearch appId="NZKNWWX3BA" apiKey="9d5779a0fff8176f0b605d67dc563044" indexName="products">
            <Search />
          </InstantSearch>
          <Product />
        </div>
      </ApolloProvider>;
  }
}

export default App;

const Search = () => (
  <div className="container">
    <SearchBox />
    <Hits hitComponent={Product} />
  </div>
);

import React, { Component } from "react";
//import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
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
import UpdateProduct from "./UpdateProduct";
import Product from "./Product";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch/dom";
import "semantic-ui-css/semantic.min.css";
import Login from "./Login";
import Header from "./Header";
import { Button } from "antd";
import Dashboard from './Dashboard';



const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZmJjODZjZjY2MmNkNGFlNjM3NTZiNCIsImVtYWlsIjoidXNlcjc3N0B1c2VyLmNvbSIsIm5hbWUiOiJ1c2VyNzc3In0sImlhdCI6MTUyNjYxMTkxNCwiZXhwIjoxNTU4MTY5NTE0fQ.1TM81XVJ_xo17BVdtMk6vBUUvDem9ujkWdB1wRTbSlE`
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
          <Dashboard />
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

import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ImageUpload from './ImageUpload';


// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { withClientState } from "apollo-link-state";
// import { ApolloLink, Observable } from "apollo-link";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: async operation => {
    //const token = await AsyncStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZWZmNGFmZDFhYWIxNjMzMWRjZjU4OSIsImVtYWlsIjoicnlhbkB1c2VyLmNvbSIsIm5hbWUiOiJSeWFuIn0sImlhdCI6MTUyNTgyMjQ4MCwiZXhwIjoxNTU3MzgwMDgwfQ.WwxT_BJMqG0UH8nzosoabD1dqstTVGkHTawvZDQ979Q`
      }
    });
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ImageUpload />
      </ApolloProvider>
    );
  }
}

export default App;

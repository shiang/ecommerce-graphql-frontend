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

// const request = async operation => {
//   //const token = await AsyncStorage.getItem("token");
//   operation.setContext({
//     headers: {
//       authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZWZmNGFmZDFhYWIxNjMzMWRjZjU4OSIsImVtYWlsIjoicnlhbkB1c2VyLmNvbSIsIm5hbWUiOiJSeWFuIn0sImlhdCI6MTUyNTgyMjQ4MCwiZXhwIjoxNTU3MzgwMDgwfQ.WwxT_BJMqG0UH8nzosoabD1dqstTVGkHTawvZDQ979Q`
//     }
//   });
// };

// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable(observer => {
//       let handle;
//       Promise.resolve(operation)
//         .then(oper => request(oper))
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer)
//           });
//         })
//         .catch(observer.error.bind(observer));

//       return () => {
//         if (handle) handle.unsubscribe();
//       };
//     })
// );

const client = new ApolloClient({
  // link: ApolloLink.from([
  //   onError(({ graphQLErrors, networkError }) => {
  //     if (graphQLErrors)
  //       graphQLErrors.map(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //         )
  //       );
  //     if (networkError) console.log(`[Network error]: ${networkError}`);
  //   }),
  // ]),
  link,
  cache: new InMemoryCache()
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
    return (
      <ApolloProvider client={client}>
      <div>
        <ImageUpload />
        <PostForm />
        <Post />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;

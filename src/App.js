import React, { Component } from "react";
import Product from "./Product";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch/dom";
import Login from "./Login";






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
      <div>
        <h1>This is Dashboard page</h1>
      </div>
    )
        
      
  }
}

export default App;

const Search = () => (
  <div className="container">
    <SearchBox />
    <Hits hitComponent={Product} />
  </div>
);

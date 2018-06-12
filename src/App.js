import React, { Component } from "react";
import SearchProduct from "./components/SearchProduct";
import { InstantSearch, SearchBox } from "react-instantsearch/dom";
import './components/styling/searchProduct.css'

class App extends Component {
  render() {
    return (
      <div>
        <h1>This is Dashboard page</h1>
      </div>
    );
  }
}

export default App;

export const Search = () => (
  <div className="container">
    <InstantSearch
      appId="NZKNWWX3BA"
      apiKey="9d5779a0fff8176f0b605d67dc563044"
      indexName="products"
    >
      <SearchBox 
      translations={{ placeholder: 'Search for products' }}/>
      <SearchProduct />
    </InstantSearch>
  </div>
);

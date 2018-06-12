import React, { Component } from "react";
import FoundProduct from "./FoundProduct";
import { Hits, Stats } from "react-instantsearch/dom";
import './styling/searchProduct.css'
class SearchProduct extends Component {
  render() {
    return (
      <div>
        <Stats />
        <Hits 
        hitComponent={FoundProduct} />
      </div>
    );
  }
}

export default SearchProduct;

import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Subscription } from "react-apollo";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Spin, BackTop, notification } from "antd";
import { ALL_PRODUCTS } from "../queries";
import FoundProduct from './FoundProduct'
import { Hits, Stats } from "react-instantsearch/dom";

class SearchProduct extends Component {
  render() {
      return (
          <div>
              <Stats />
          <Hits hitComponent={FoundProduct} />
          </div>
      )
  }
}

export default SearchProduct;

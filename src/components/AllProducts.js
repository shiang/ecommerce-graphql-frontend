import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Subscription } from "react-apollo";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Spin, BackTop, notification } from "antd";
import { ALL_PRODUCTS } from "../queries";

class AllProducts extends Component {
  render() {
    console.log(this.props);
    return (
      <Query query={ALL_PRODUCTS}>
        {({ loading, error, data }) => {
          if (!loading) {
            //console.log("Product Data: ", data);
            //console.log("Hits props: ", this.props.hit);

            return (
              <Card.Group stackable centered doubling itemsPerRow="5">
                <BackTop />
                {data.allProducts.map(product => {
                  const {
                    name,
                    price,
                    description,
                    category,
                    _id,
                    images
                  } = product;

                  const imageUrl =
                    images.length > 0
                      ? images[0].pictureUrl
                      : "http://fillmurray.com/200/300";

                  return (
                    <Card
                      key={_id}
                      fluid
                      raised
                      onClick={() => {
                        this.props.history.push(
                          `/products/${_id}`
                        );
                      }}
                    >
                      <Image src={imageUrl} fluid />
                      <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{category}</Card.Meta>
                        <Card.Description>{description}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>${price}</Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            );
          }

          return <Spin />;
        }}
      </Query>
    );
  }
}

export default AllProducts;

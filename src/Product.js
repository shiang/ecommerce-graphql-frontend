import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Subscription } from "react-apollo";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Spin, BackTop, notification } from "antd";
import { PRODUCT_CREATED, FETCH_VENDOR } from "./queries";
import { TokenContext } from "./components/Auth";

class Product extends Component {
  render() {
    return (
      <TokenContext.Consumer>
        {({ vendorId }) => (
          <Query
            query={FETCH_VENDOR}
            variables={{ _id: vendorId }}
          >
            {({ loading, error, data }) => {
              if (!loading) {
                //console.log("Product Data: ", data);
                //console.log("Hits props: ", this.props.hit);

                return (
                  <Card.Group stackable itemsPerRow="4">
                    <BackTop />
                    {data.vendor.products.map(product => {
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
                              `/manager/${
                              vendorId
                              }/products/${_id}/edit`
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
        )}
      </TokenContext.Consumer>
    );
  }
}

export default Product;

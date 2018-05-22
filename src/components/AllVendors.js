import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Subscription } from "react-apollo";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Spin, BackTop, notification } from "antd";
import { ALL_VENDORS } from "../queries";

class AllVendors extends Component {
  render() {
    console.log(this.props);
    return (
      <Query query={ALL_VENDORS}>
        {({ loading, error, data }) => {
          if (!loading) {
            //console.log("Product Data: ", data);
            //console.log("Hits props: ", this.props.hit);

            return (
              <Card.Group stackable centered doubling itemsPerRow="5">
                <BackTop />
                {data.allVendors.map(vendor => {
                  const {
                    _id,
                    name,
                    description,
                    pictures
                  } = vendor;

                  const imageUrl =
                    pictures.length > 0
                      ? pictures[0].pictureUrl
                      : "http://fillmurray.com/200/300";

                  return (
                    <Card
                      key={_id}
                      fluid
                      raised
                      onClick={() => {
                        this.props.history.push(`/vendors/${_id}`);
                      }}
                    >
                      <Image src={imageUrl} fluid />
                      <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        
                        <Card.Description>{description}</Card.Description>
                      </Card.Content>
                      
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

export default AllVendors;

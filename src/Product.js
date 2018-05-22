import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Subscription } from "react-apollo";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Spin, BackTop, notification } from "antd";
import { PRODUCT_CREATED, CHATROOM_CREATED, FETCH_VENDOR } from "./queries";
import { TokenContext } from './components/Auth'



class Product extends Component {


    render() {
    return <Subscription subscription={CHATROOM_CREATED}>
        {({ data, loading }) => {
          if (!loading) {
            // notification.open({
            //     message: data.createChatroom.name,
            //     description: 'A New Chatroom has been created! Please refresh the screen.'
            // })
            console.log(data);
          }
          return <Query query={FETCH_VENDOR} variables={{ _id: this.props.match.params.id }}>
              {({ loading, error, data }) => {
                if (!loading) {
                  //console.log("Product Data: ", data);
                  //console.log("Hits props: ", this.props.hit);

                  return <Card.Group stackable itemsPerRow="4">
                      <BackTop />
                      {data.vendor.products.map(product => {
                        const { name, price, description, category, _id, images } = product;

                        const imageUrl = images.length > 0 ? images[0].pictureUrl : "http://fillmurray.com/200/300";

                        return <Card key={_id} fluid raised onClick={() => {
                              this.props.history.push(`/manager/${this.props.match.params.id}/products/${_id}/edit`);
                            }}>
                            <Image src={imageUrl} fluid />
                            <Card.Content>
                              <Card.Header>{name}</Card.Header>
                              <Card.Meta>{category}</Card.Meta>
                              <Card.Description>
                                {description}
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>${price}</Card.Content>
                          </Card>;
                      })}
                    </Card.Group>;
                }

                return <Spin />;
              }}
            </Query>;
        }}
      </Subscription>;
  }
}

export default Product;

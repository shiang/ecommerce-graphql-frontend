import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";

class FoundProduct extends React.Component {
    render() {
        const { hit } = this.props;
        const imageUrl = hit.product.images > 0 ? hit.product.images[0].pictureUrl : "http://fillmurray.com/200/300"
        console.log(hit)
        return (
            <Card.Group stackable centered doubling itemsPerRow="5">
            <Card
                key={hit.product._id}
                fluid
                raised
                onClick={() => {
                    this.props.history.push(`/products/${hit.product._id}`);
                }}
            >
                <Image src={imageUrl} fluid />
                <Card.Content>
                    <Card.Header>{hit.product.name}</Card.Header>
                    <Card.Meta>{hit.product.category}</Card.Meta>
                    <Card.Description>{hit.product.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>${hit.product.price}</Card.Content>
            </Card>
            </Card.Group>
        );
    }
}

export default FoundProduct;
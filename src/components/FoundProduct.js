import React from 'react';
import { Card } from "semantic-ui-react";

class FoundProduct extends React.Component {
    render() {
        const { hit } = this.props;
        return (
            <Card.Group stackable doubling itemsPerRow="5">
            <Card
                key={hit.product._id}
                fluid
                raised
                onClick={() => {
                    this.props.history.push(`/products/${hit.product._id}`);
                }}
            >
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
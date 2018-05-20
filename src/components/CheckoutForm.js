import React, { Component } from 'react'
import { Form, Table, Button } from "semantic-ui-react";
import { Row, Col } from "antd";

class CheckoutForm extends React.Component {
    render() {
        return <Row type="flex" justify="space-around">
            <Col span={12}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input fluid label="First name" />
                  <Form.Input fluid label="Last name" />
                </Form.Group>

                <Form.Input fluid label="Company name" />

                <Form.Group widths="equal">
                  <Form.Input fluid label="Email address" />
                  <Form.Input fluid label="Mobile No." />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input fluid label="Country" />
                  <Form.Input fluid label="City" />
                </Form.Group>
                <Form.Input fluid label="Address" />
                <Form.Input fluid placeholder="Apartment, suite, unit etc. (optional)" />
              </Form>
            </Col>
            <Col span={6}>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Premium Plan</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>John Lilki</Table.Cell>
                            <Table.Cell textAlign="right">No</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie Harington</Table.Cell>
                            
                            <Table.Cell textAlign="right">Yes</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jill Lewis</Table.Cell>
                            
                            <Table.Cell textAlign="right">Yes</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button fluid type="Primary">Place Order</Button>
            </Col>
          </Row>;
    }
}

export default CheckoutForm
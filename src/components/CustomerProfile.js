import React from "react";
import { Grid, Image, Item } from "semantic-ui-react";
import { FETCH_CUSTOMER } from "../queries"
import { Mutation, Query } from "react-apollo";
import { Spin, Switch } from "antd";

class CustomerProfile extends React.Component {
    render() {
        return <Query query={FETCH_CUSTOMER} variables={{ _id: "5afbff7792c1fe5ebb23354e" }}>
            {({ data, loading, error }) => {
              if (!loading) {
                const { name, email } = data.customer;
                return <Grid columns={2} divided>
                    <Grid.Row>
                      <Grid.Column>
                        <Item.Group>
                          <Item>
                            <Item.Image size="tiny" src="http://fillmurray.com/200/300" circular />

                            <Item.Content>
                              <Item.Header as="a">{name}</Item.Header>
                              <Item.Meta>{email}</Item.Meta>
                              
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Grid.Column>
                      <Grid.Column />
                    </Grid.Row>
                  </Grid>;
              }

              return <Spin />;
            }}
          </Query>;
    }
}

export default CustomerProfile;

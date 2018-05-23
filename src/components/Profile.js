import React from "react";
import { Grid, Item } from "semantic-ui-react";
import { GET_VENDOR } from "../queries"
import { Query } from "react-apollo";
import { Spin, Switch } from "antd";

class Profile extends React.Component {
  render() {
    return <Query query={GET_VENDOR} variables={{ _id: "5afbc86cf662cd4ae63756b5" }}>
        {({ data, loading, error }) => {
          if (!loading) {
            const { name, phone, address, description } = data.vendor;
            return <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column>
                    <Item.Group>
                      <Item>
                        <Item.Image size="tiny" src="http://fillmurray.com/200/300" circular/>

                        <Item.Content>
                          <Item.Header as="a">{name}</Item.Header>
                          <Item.Meta>{phone}</Item.Meta>
                          <Item.Description>
                            {description}
                          </Item.Description>
                          <Item.Extra>{address}</Item.Extra>
                          <Switch checkedChildren="We are Open!" unCheckedChildren="We are closed" defaultChecked />
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

export default Profile;

import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import jwtDecoder from "jwt-decode";
import { GET_VENDOR_ID } from "../queries";

class AuthForm extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false
  };

  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = async (client) => {
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    const result = await this.props.login({
      variables: {
        email,
        password
      }
    });

    await localStorage.setItem("token", result.data.login.token);

    const decoded = await jwtDecoder(result.data.login.token);

    const { data } = await client.query({
      query: GET_VENDOR_ID,
      variables: {
        _id: decoded.user._id
      }
    });


    await localStorage.setItem("vendorId", data.user.vendor._id);
    await this.setState({
      loading: false
    }, () => {
      this.props.history.push(`/manager/${data.user.vendor_id}/products`);
    });

    
  };

  signUp = async(client) => {
    const { email, password } = this.state;
    await this.props.signUp({
      variables: {
        email,
        password
      }
    });

    await this.login(client)
  }

  onSubmit = async client => {
    //e.preventDefault()
    if(this.props.submitButtonLabel === "Log in") {
      this.login(client);
    }

    if(this.props.submitButtonLabel === "Sign up") {
      this.signUp(client);
    }
  
    
  };

  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {" "}
              Log-in to your account
            </Header>
            <ApolloConsumer>
              {client => (
                <Form 
                size="large" 
                onSubmit={() => this.onSubmit(client)}
                loading={this.state.loading}
                >
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="email"
                      onChange={this._handleChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={this._handleChange}
                    />
                    {this.props.submitButtonLabel === "Sign up" && (
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                      />
                    )}

                    <Button color="teal" fluid size="large">
                      {this.props.submitButtonLabel}
                    </Button>
                  </Segment>
                </Form>
              )}
            </ApolloConsumer>
            {this.props.submitButtonLabel === "Log in" && (
              <Message>
                New to us?
                <Link to="/signup">Sign up</Link>
              </Message>
            )}
            {this.props.submitButtonLabel === "Sign up" && (
              <Message>
                Already have an account?
                <Link to="/login">Log in</Link>
              </Message>
            )}
            <Button color="red" fluid size="large">
              or sign in with Google
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AuthForm;

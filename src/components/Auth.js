import React, { Component } from "react";
import PropTypes from "prop-types";
import { LOGIN, SIGN_UP } from "../mutations";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import jwtDecoder from "jwt-decode";
import { GET_VENDOR_ID } from "../queries";

//Creating context
export const TokenContext = React.createContext();

//The Auth components
class Auth extends Component {
  constructor(props) {
    super(props);

    //Sign out function
    this.signOut = async () => {
      await localStorage.removeItem("token");
      await localStorage.removeItem("vendorId");
      this.props.history.push("/");
    };

    //Component states
    this.state = {
      loading: false,
      token: localStorage.getItem("token"),
      error: false,
      signOut: this.signOut,
      vendorId: localStorage.getItem("vendorId"),
      email: "",
      password: ""
    };
  }

  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = async (client, login) => {
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    const result = await login({
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

    await this.setState({
      token: result.data.login.token,
      vendorId: data.user.vendor._id
    });

    await localStorage.setItem("vendorId", data.user.vendor._id);
    await this.setState(
      {
        loading: false
      },
      () => {
        this.props.history.push(`/manager/${data.user.vendor._id}/products`);
      }
    );
  };

  signUp = async (client, login, signUp) => {
    const { email, password } = this.state;
    await signUp({
      variables: {
        email,
        password
      }
    });

    await this.login(client, login);
  };

  onSubmit = async (client, login, signUp) => {
    //e.preventDefault()
    if (this.props.submitButtonLabel === "Log in") {
      this.login(client, login);
    }

    if (this.props.submitButtonLabel === "Sign up") {
      this.signUp(client, login, signUp);
    }
  };

  //Component render function
  render() {
    //Props destructuring
    const { children } = this.props;

    //State destructuring
    const { token } = this.state;

    return (
      <div>
        {token ? (
          <TokenContext.Provider value={this.state}>
            {children}
          </TokenContext.Provider>
        ) : (
          <Mutation mutation={LOGIN}>
            {login => (
              <Mutation mutation={SIGN_UP}>
                {signUp => (
                  <div className="login-form">
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
                              onSubmit={() =>
                                this.onSubmit(client, login, signUp)
                              }
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
                        <form action="https://ur-shop-graphql-server.now.sh/auth/google">
                          <Button color="red" fluid size="large">
                            or sign in with Google
                          </Button>
                        </form>
                      </Grid.Column>
                    </Grid>
                  </div>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </div>
    );
  }
}

Auth.propTypes = {
  submitButtonLabel: PropTypes.string.isRequired,
  email: PropTypes.string
};

Auth.defaultProps = {
  email: ""
};

export default Auth;

// const styles = {
//     form: {
//         marginBottom: 20
//     },
//     icons: {
//         marginLeft: 10,
//         marginRight: 10,
//         color: grey500
//     }
// };

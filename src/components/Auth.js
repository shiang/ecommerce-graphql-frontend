import React, { Component } from "react";
import PropTypes from "prop-types";
import AuthForm from "./AuthForm";
import { LOGIN } from '../mutations'
import { Mutation } from 'react-apollo'

 

//Axios for Ajax
//import axios from "axios";

//Creating context
export const TokenContext = React.createContext();

//The Auth components
class Auth extends Component {
  constructor(props) {
    super(props);

    //Sign out function
    this.signOut = () => {
      localStorage.removeItem("token");
      this.props.history.push("/");
    };

    //Component states
    this.state = {
      loading: false,
      token: localStorage.getItem("token"),
      error: false,
      signOut: this.signOut,
      vendorId: localStorage.getItem("vendorId")
    };
  };


  //Component render function
  render() {
    //Props destructuring
    const { submitButtonLabel, children, history } = this.props;

    //State destructuring
    const { loading, token, error } = this.state;
    console.log(this.props);
    return (
      <div>
      
        {token ? (
          <TokenContext.Provider value={this.state}>
            {children}
          </TokenContext.Provider> 
        ) : (
          <Mutation mutation={LOGIN}>
            {(login) => (
                <AuthForm 
                history={history}
                submitButtonLabel={submitButtonLabel}
                login={login} 
                />
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

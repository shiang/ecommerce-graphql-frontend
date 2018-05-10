import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const CREATE_POST_SUBSCRIPTION = gql`
  subscription {
    postCreated {
      _id
      title
      text
    }
  }
`;

class Post extends Component {
  render() {
    return (
      <Subscription 
      subscription={CREATE_POST_SUBSCRIPTION}
      >
        {({ data, loading, error }) => {
            if(error) {
                console.log(error);
            };

            if(!loading) {
                console.log(data);
                return (
                    <h1>Updated!</h1>
                )
            }
            return (
                <h1>Loading...</h1>
            )
        }}
      </Subscription>
    );
  }
}

export default Post;

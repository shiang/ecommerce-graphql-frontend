import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const CREATE_POST = gql`
    mutation {
        createPost(
            title: "This is a book 10930", 
            text: "This is book 10392 and it's all about GraphQL subscription!!",
            author: "5aef9ee8d2b9774730e7051f"
        ) {
            _id
            title
            text
            author {
            _id
            firstName
            }
        }
    }
`


class PostForm extends Component {

    render() {
        return (
            <div>
                <button onClick={() => this.props.createPost()}>Create Post</button>
            </div>
        )
    }
}

export default graphql(CREATE_POST, { name: 'createPost' })(PostForm);

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";
import axios from "axios";
import moment from "moment";
import gql from "graphql-tag";

const S3_SIGN_REQUEST = gql`
  mutation SignS3($filename: String!, $filetype: String!) {
  signS3 (filename: $filename, filetype: $filetype) {
    signedRequest
    url
  }
}
`;

const CREATE_PICTURE = gql`
  mutation ($name: String!, $pictureUrl: String!) {
  createPicture(name: $name, pictureUrl: $pictureUrl) {
    _id
    name
    pictureUrl
  }
}
`;

class ImageUpload extends Component {
  state = {
    name: "",
    file: null
  };

  onDrop = async files => {
    this.setState({ file: files[0] });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
  };

  formatFilename = filename => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  submit = async (s3SignRequest, createPicture) => {
    const { name, file } = this.state;
    const response = await s3SignRequest({
      variables: {
        filename: this.formatFilename(file.name),
        filetype: file.type
      }
    });

    console.log(response);
    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(file, signedRequest);

    const graphqlResponse = await createPicture({
      variables: {
        name,
        pictureUrl: url
      }
    });

    console.log(graphqlResponse);
    // this.props.history.push(
    //     `/champion/${graphqlResponse.data.createChampion.id}`
    // );
  };

  render() {
    return (
      <Mutation mutation={S3_SIGN_REQUEST}>
        {(s3SignRequest, { data }) => (
          <Mutation mutation={CREATE_PICTURE}>
            {(createPicture, { data }) => (
              <div>
                <input
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <Dropzone onDrop={this.onDrop}>
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                </Dropzone>
                <button onClick={() => this.submit(s3SignRequest, createPicture)}>
                  Submit
                </button>
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default ImageUpload

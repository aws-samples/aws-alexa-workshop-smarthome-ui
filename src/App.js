import React, { Component } from 'react';
import './App.css';
import Amplify, { API, graphqlOperation, Auth, S3Image } from 'aws-amplify';
import { createDevice } from './graphql/mutations'
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'

Amplify.configure(awsconfig);

class App extends Component {

  bindDeviceToUser = async () => {

    const currentUser = await Auth.currentAuthenticatedUser();

    const deviceDetails = {
      name: "first device",
      description: "this is a shit",
      userId: currentUser.username
    };

    const newDevice = await API.graphql(graphqlOperation(createDevice, {input: deviceDetails}));
    console.log(JSON.stringify(newDevice))

  };


  render() {
    return (
        <div className="App">
          <p> Pick a file</p>
          <button onClick={this.bindDeviceToUser}> Bind </button>
        </div>
    );
  }
}

const signUpConfig = {
  defaultCountryCode: "86",
  usernameAttributes: "email"
};

export default withAuthenticator(App, { signUpConfig });

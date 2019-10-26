import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'

import Device from './Device';
import Devices from './Devices';

Amplify.configure(awsconfig);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App () {
  //const urlParams = new URLSearchParams(window.location.search);
  //const thingName = urlParams.get('thingName');
  const classes = useStyles();

  const logout = async () => {
    await Auth.signOut();
  };

  return (
    <Router>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Alexa Workshop
          </Typography>
          <Button color="inherit" onClick={logout}>Sign Out</Button>
        </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/device/:thingName" render={({ match }) => <Device thingName={match.params.thingName}/>}>
          </Route>
          <Route path="/">
            <Devices />
          </Route>
        </Switch>

    </div>
    </Router>
  );
}



const signUpConfig = {
  defaultCountryCode: "46",
  usernameAttributes: "email"
};

export default withAuthenticator(App, { signUpConfig });
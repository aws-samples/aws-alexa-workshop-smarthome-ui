import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import {API, Auth, graphqlOperation} from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import Connect from "aws-amplify-react/src/API/GraphQL/Connect";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
});

export default function Device() {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const thingName = urlParams.get('thingName');

  const bindDeviceToUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();

    const deviceDetails = {
      thingName: thingName,
      username: currentUser.username,
      description: 'Smart Lamp'
    };

    const newDevice = await API.graphql(graphqlOperation(mutations.createDevice, {input: deviceDetails}));
    console.log(newDevice)
  };

  const unbindDevice = async () => {

    const oldDevice = await API.graphql(graphqlOperation(mutations.deleteDevice, {input: {thingName: thingName}}));
    console.log(oldDevice)
  };

  const CardView = ({ device }) =>  (
    <Grid container justify={"center"}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/lamp.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Smart Lamp
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Smart lamp controlled to Alexa.
            Click the button to bind to your account.
          </Typography>
        </CardContent>
        <CardActions>
          {(() => {
            if (device && device.username) {
              return (
                <Button variant="contained" size="large" color="primary" onClick={unbindDevice}>
                  Unbind
                </Button>
              )
            } else {
              return (
                <Button variant="contained" size="large" color="primary" onClick={bindDeviceToUser}>
                  Bind
                </Button>
              )
            }
          })()}
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <div>
      <Connect query={graphqlOperation(queries.getDevice, {thingName: thingName})}>
        {({ data: { getDevice }, error }) => {
          if (error) return (<h3>Error</h3>);
          return (<CardView device={getDevice} /> );
        }}
      </Connect>
    </div>
  );
}
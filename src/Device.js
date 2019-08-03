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
import {createDevice} from "./graphql/mutations";


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginTop: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
});

export default function Device() {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const deviceId = urlParams.get('deviceId');

  console.log(`device id: ${deviceId}`);

  const bindDeviceToUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();

    const deviceDetails = {
      id: deviceId,
      name: "first device",
      description: "this is a shit",
      userId: currentUser.username
    };

    const newDevice = await API.graphql(graphqlOperation(createDevice, {input: deviceDetails}));
    console.log(newDevice)
  };

  return (
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
          <Button size="small" color="primary" onClick={bindDeviceToUser}>
            Bind
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
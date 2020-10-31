import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import { Connect } from "aws-amplify-react";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {amber, green} from "@material-ui/core/colors"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
  const [open, setOpen] = React.useState(false);
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
    setOpen(true)

    console.log(newDevice)
  };

  const unbindDevice = async () => {

    const oldDevice = await API.graphql(graphqlOperation(mutations.deleteDevice, {input: {thingName: thingName}}));
    setOpen(true)

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

  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  const variantIcon = {
    success: CheckCircleIcon
  };

  function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
        </span>
        }
        {...other}
      />
    );
  }

  MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  };


  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }


  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          variant="success"
          message="Success!"
          onClose={handleClose}
        />
      </Snackbar>
      <Connect query={graphqlOperation(queries.getDevice, {thingName: thingName})}>
        {({ data: { getDevice }, error }) => {
          if (error) return (<h3>Error</h3>);
          return (<CardView device={getDevice} /> );
        }}
      </Connect>
    </div>
  );
}

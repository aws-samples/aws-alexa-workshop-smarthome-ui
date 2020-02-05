import React from 'react';

import {graphqlOperation} from "aws-amplify";
import * as queries from "./graphql/queries";
import { Connect } from "aws-amplify-react";

import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Devices() {
  return (
    <Connect query={graphqlOperation(queries.listDevices)}>
      {({ data, error }) => {
        if (error) return (<h3>Error</h3>);
        if (data.listDevices) {
          console.log("data:");
          console.log(data);
          if (data.listDevices && data.listDevices.items && data.listDevices.items.length > 0) {
            var devices = [];
            data.listDevices.items.forEach(function (value) {
              console.log(value);
              devices.push(<GridListTile key={value.thingName}>
                <img src="/static/images/lamp.png" alt="lamp" />
                <Link to={{ pathname: `/device/${value.thingName}` }}>
                <GridListTileBar title={value.thingName} />                 
                </Link>
              </GridListTile> )
            });
            return (
              <GridList>
                { devices }
              </GridList>)
          } else {
            return (<h3>No devices</h3>)
          }
        } else {
          return (
            <h3>Loading...</h3>
          )
        }
      }}
    </Connect>
  )
}

/**
 * @file Manage the login component for the web application
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./login.component.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100ch",
      },
    },
  })
);

export const LoginComponent: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <img alt="logo" id="logo" src={require("../../../logo/image.png")} />

      <div className="wrapper">
        <div className="form-wrapper">
          <h3 className="h3">Login</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
          </form>
          <div className="logIn">
            <button type="submit">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

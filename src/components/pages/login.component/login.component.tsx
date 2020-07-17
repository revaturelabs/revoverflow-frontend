/**
 * @file Manage the login component for the web application
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./login.component.css";
import * as loginRemote from '../../../remotes/login.remote'
import { useHistory } from 'react-router';
import { useState } from 'react';

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

  const history = useHistory();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {}, []);

let response: any;
const setInformation = async()=>{
  setInputEmail('');
  setInputPassword('');
  console.log(response)
  const authToken=response.data.token;
  //const decodeValue= JSON.parse(window.atob(authToken.split('.')[1]))
  localStorage.setItem('accessToken', authToken);
  localStorage.setItem('admin', authToken);
  localStorage.setItem('email', authToken)
  localStorage.setItem('firstName', authToken);
  localStorage.setItem('lastName', authToken);
  localStorage.setItem('jwt', authToken);
  localStorage.setItem('points', authToken);
  localStorage.setItem('profilePicture', authToken);
  localStorage.setItem('rssaccountId', authToken);
  localStorage.setItem('userID', authToken);
  history.push('/feed')
}

const addLoginCredentials = async () => {
  const payload = {
    email: inputEmail,
    password: inputPassword
  };
      try {
            response = await loginRemote.checkLoginCredentials(payload);
            await setInformation();
        } catch { 
            alert('Incorrect username and/or password')
            }
        
        } 


  
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
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </form>
          <div className="logIn">
            <button type="submit" onClick={() => addLoginCredentials()}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

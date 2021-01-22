import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./login.component.css";
import * as loginRemote from '../../../remotes/login.remote'
import { useHistory } from 'react-router';
import { authAxios } from "../../../remotes/internal.axios";

interface Props {

}

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



const LoginFirebase: React.FC = (props: Props) => {

    //use the styling above component declaration
    const classes = useStyles();

    const history = useHistory();

    //state for getting user's input for credentials
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    useEffect(() => { }, []);


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
                        <div className="logIn">
                            <button type="submit"
                            // onClick={(e) => addLoginCredentials(e)}
                            >Log In
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginFirebase;

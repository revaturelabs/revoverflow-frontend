import React from 'react'
import { Redirect } from 'react-router'
import {FirebaseAuthConsumer} from '@react-firebase/auth';
import firebase from "firebase/app";

const UserAuthRoute: React.FunctionComponent<any> = (props) => {
   
    return (
        // <FirebaseAuthConsumer>
        // {({ isSignedIn, user, providerId }) => {
        //     // return isSignedIn ? (
        //     //     <>
        //     //     {console.log("IN Consumer : " + isSignedIn + "  _ " + user)}
        //     //         {props.children}
        //     //     </>
        //     // ) : <Redirect to="/" />
        //     return <>
        //     {console.log("IN Consumer : " + isSignedIn + "  _ " + user)}
        //         {props.children}
        //     </>
        // }}
        // </FirebaseAuthConsumer> 
        localStorage.getItem("accessToken")? 
            <>
            {props.children} 
            </> :
        <Redirect to='/'/>
    )         
}

//HOC
const protectComponent = (Component: any) => {
    return (props: any) => {
        return (
            <>
                <UserAuthRoute>
                    <Component {...props} />
                </UserAuthRoute>
            </>
        )
    }
}

export default protectComponent
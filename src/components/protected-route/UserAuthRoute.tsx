import React from 'react'
import { Redirect } from 'react-router'
import {FirebaseAuthConsumer} from '@react-firebase/auth';

const UserAuthRoute: React.FunctionComponent<any> = (props) => {
    return (
        <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
            return isSignedIn ? (
                <>
                    {props.children}
                </>
            ) : <Redirect to="/" />
        }}
        </FirebaseAuthConsumer>
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
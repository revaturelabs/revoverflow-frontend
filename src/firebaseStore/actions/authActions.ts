import { ThunkAction } from 'redux-thunk';
import { SignUpData, AuthAction, SET_USER, User, SET_ERROR, SET_LOADING, SignInData, SET_SUCCESS, NEED_VERIFICATION, SIGN_OUT } from '../types';
import { RootState } from '../firebaseIndex';
import firebase from '../../firebase/config';
import * as loginRemote from '../../remotes/login.remote'
import { authAxios } from "../../remotes/internal.axios";
import { useHistory } from 'react-router-dom'

export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            if (res.user) {
                const userData: User = {
                    email: data.email,
                    firstName: data.firstName,
                    id: res.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
                await res.user.sendEmailVerification();
                dispatch({
                    type: NEED_VERIFICATION
                });
                dispatch({
                    type: SET_USER,
                    payload: userData
                });
            }
        } catch (err) {
            console.log(err);
            onError();
            dispatch({
                type: SET_ERROR,
                payload: err.message
            });
        }
    }
}

// Get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await firebase.firestore().collection('users').doc(id).get();
            if (user.exists) {
                const userData = user.data() as User;
                dispatch({
                    type: SET_USER,
                    payload: userData
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

// Set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        });
    }
}

// Log in
export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const authVar = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            // await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            console.log(authVar)
            addLoginCredentials(data.email, data.password);
        } catch (err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

// let history = useHistory();
let response: any;
const setInformation = async () => {

    authAxios.defaults.headers["Authorization"] = response.headers.authorization

    localStorage.setItem('accessToken', response.headers.authorization);
    localStorage.setItem('admin', response.data.admin);
    localStorage.setItem('email', response.data.email)
    localStorage.setItem('firstName', response.data.firstName);
    localStorage.setItem('lastName', response.data.lastName);
    localStorage.setItem('points', response.data.points);
    localStorage.setItem('profilePicture', response.data.profilePicture);
    localStorage.setItem('rssaccountId', response.data.rssaccountId);
    localStorage.setItem('userId', response.data.userID);
    // history.push('/feed')
}

const addLoginCredentials = async (email: string, password: string) => {
    // e.preventDefault()
    const payload = {
        email: email,
        password: password
    };
    try {
        response = await loginRemote.checkLoginCredentials(payload);

        await setInformation();
    } catch {
        alert('Incorrect username and/or password')
    }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: SIGN_OUT
            });
        } catch (err) {
            console.log(err);
            dispatch(setLoading(false));
        }
    }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
}

// Set need verification
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: NEED_VERIFICATION
        });
    }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }
}

// Send password reset email
export const sendPasswordResetEmail = (email: string, successMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(successMsg));
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}
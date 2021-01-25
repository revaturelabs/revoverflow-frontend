import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Input';
import Button from '../../Button';
import Message from '../../Message';
import { signin, setError } from '../../../firebaseStore/actions/authActions';
import { RootState } from '../../../firebaseStore/firebaseIndex';
import { Link } from 'react-router-dom';
import * as loginRemote from '../../../remotes/login.remote'


// const SignIn: FC = () => {
// //     const [inputEmail, setInputEmail] = useState('');
// //   const [inputPassword, setInputPassword] = useState('');
// //     // const { error } = useSelector((state: RootState) => state.auth);

// //     // useEffect(() => {
// //     //     return () => {
// //     //         if (error) {
// //     //             dispatch(setError(''));
// //     //         }
// //     //     }
// //     // }, [error, dispatch]);

// //     const submitHandler = (e: FormEvent) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         //dispatch(signin({ email, password }, () => setLoading(false)));
// //     }

// //     const addLoginCredentials = async (e: any) => {
// //         e.preventDefault()
// //         const payload = {
// //           email: inputEmail,
// //           password: inputPassword
// //         };

// //     return (
// //         <section className="section">
// //             <div className="container">
// //                 <h2 className="has-text-centered is-size-2 mb-3">Sign In</h2>
// //                 <form className="form" onSubmit={submitHandler}>
// //                     {/* {error && <Message type="danger" msg={error} />} */}
// //                     <Input
// //                         type="email"
// //                         name="email"
// //                         value={email}
// //                         onChange={(e) => setInputEmail(e.target.value)}
// //                         placeholder="email address"
// //                         label="email address"
// //                     />
// //                     <Input
// //                         name="password"
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.currentTarget.value)}
// //                         placeholder="Password"
// //                         label="Password"
// //                     />
// //                     <p><Link to="/forgot-password">Forgot password?</Link></p>
// //                     <button type="submit" onClick={(e) => addLoginCredentials(e)}>Log In</button>
// //                 </form>
// //             </div>
// //         </section>
// //     )
// }

// export default SignIn;
//firebase authentication imports
import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button';
import { RootState } from '../../firebaseStore/firebaseIndex';
import { signout } from '../../firebaseStore/actions/authActions';
import { Link, useHistory } from 'react-router-dom';


const Header: FC = () => {
    //firebase authentication variables
    const dispatch = useDispatch();
    const history = useHistory();
    const { authenticated } = useSelector((state: RootState) => state.auth);

    const logoutClickHandler = () => {
        dispatch(signout());
    }


    return (
        <nav className="navbar is-spaced has-shadow">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to={!authenticated ? "/" : "/dashboard"}> AppName</Link >
                </div>
                <div className="navbar-end">
                    <div className="navbar-items">
                        {!authenticated ? <div className="buttons">
                            <Button text="sign up" onClick={() => history.push('/signup')} className="is-primary" />
                            <Button text="sign up" onClick={() => history.push('/signin')} />
                        </div>
                            :
                            <Button text="Sign out" onClick={logoutClickHandler} />
                        }
                    </div>
                </div>
            </div>
        </nav>
    )

}
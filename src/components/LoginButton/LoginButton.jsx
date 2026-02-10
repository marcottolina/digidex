import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {Button, Spinner} from 'reactstrap';
import style from './LoginButton.module.css';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    // Don't show if already logged in
    if (isAuthenticated) {
        return null;
    }

    // Show loading state
    if (isLoading) {
        return (
            <Spinner color="light"></Spinner>
        );
    }

    //Render the button
    return (
        <Button
            onClick={() => loginWithRedirect()}
            className={style.buttonLogin}
        >
            Login
        </Button>
    );
};

export default LoginButton;

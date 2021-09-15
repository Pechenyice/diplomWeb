import React from "react";
import { Redirect } from "react-router";
import styles from './Auth.module.css';

const Auth = ({location}) => {

    const redirectPath = () => {
        const locationState = location.state;
        const pathname = (
            locationState && locationState.from && locationState.from.pathname
        );
        return pathname || '/profile';
    };

    return (
        <div onClick={() => (<Redirect to={redirectPath()} />)}>Хто я</div>
    );
}

export default Auth;

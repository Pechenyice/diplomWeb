import React, { useEffect } from "react";
import { Redirect } from "react-router";
import styles from './Auth.module.css';
import PropTypes from 'prop-types';
import Client from "../../../Client/Client";

const Auth = ({ location, isLogged, onAuthTry }) => {
    useEffect(() => {
        return () => {
            Client.abortLoadAuthDataFetch();
        }
    }, []);

    const redirectPath = () => {
        const locationState = location.state;
        const pathname = (
            locationState && locationState.from && locationState.from.pathname
        );
        return pathname || '/profile';
    };

    return (
        <div>
            {
                isLogged ?
                <Redirect to={redirectPath()} /> : 
                null
            }
            <div>Хто я</div>
            <div onClick={() => {onAuthTry()}}>Авторизоваться</div>
        </div>
    );
}

Auth.propTypes = {
    location: PropTypes.object,
    isLogged: PropTypes.bool.isRequired,
    onAuthTry: PropTypes.func.isRequired
}

export default Auth;

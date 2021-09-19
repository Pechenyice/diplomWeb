import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styles from './Auth.module.css';
import PropTypes from 'prop-types';
import Client from "../../../Client/Client";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Auth = ({ location, isLogged, onAuthTry }) => {
    useEffect(() => {
        return () => {
            Client.abortLoadAuthDataFetch();
        }
    }, []);

    const [state, setState] = useState({
        signIn: {
            login: '',
            pass: ''
        },
        signUp: {
            login: '',
            nick: '',
            pass: '',
            rePass: '',
            agreement: false
        }
    });

    const redirectPath = () => {
        const locationState = location.state;
        const pathname = (
            locationState && locationState.from && locationState.from.pathname
        );
        return pathname || '/profile';
    };

    function handleSignInLoginChange(e) {
        setState(
            Object.assign(
                {},
                state,
                {
                    signIn: Object.assign({}, state.signIn, { login: e.target.value })
                }
            )
        );
    }

    return (
        <section className={styles.authWrapper}>
            {
                isLogged ?
                    <Redirect to={redirectPath()} /> :
                    null
            }
            <h1><span className={styles.authSignIn}>SIGN IN</span> <span className={styles.authSignUp}>& CREATE ACCOUNT</span></h1>
            <p className={styles.authHint}>We will redirect you to your target just in<br />a moment, introduce yourself please</p>
            <div className={styles.inputsBlock} >
                <div className={styles.inputsWrapper} >
                    <Input id={'signInlogin'} label={'Login/Email'} isEmpty={!state.signIn.login} onChange={handleSignInLoginChange} />
                    <Input id={'signInPassword'} label={'Password'} isEmpty={!state.signIn.pass} onChange={() => {}} />
                    <Button text={'Sign in'} onClick={() => {}} style={{marginTop: '15px'}} />
                </div>
                <div className={styles.inputsWrapper} >
                    <Input id={'signUplogin'} label={'Login/Email'} isEmpty={!state.signUp.login} onChange={() => {}} />
                    <Input id={'signUpNickname'} label={'Nickname'} isEmpty={!state.signUp.nick} onChange={() => {}} />
                    <Input id={'signUpPassword'} label={'Password'} isEmpty={!state.signUp.pass} onChange={() => {}} />
                    <Input id={'signUpRePassword'} label={'Repeat password'} isEmpty={!state.signUp.rePass} onChange={() => {}} />
                    <div style={{margin: '15px 0'}}>
                        <input type='checkbox' id='checkbox'/>
                        <label style={{marginLeft: '10px'}} htmlFor='checkbox'>I agree <Link to={'/terms'}>Terms & conditions</Link></label>
                    </div>
                    <Button text={'Create account'} onClick={() => {}} />
                </div>
            </div>
            {/* <div onClick={() => { onAuthTry() }}>Авторизоваться</div> */}
        </section>
    );
}

Auth.propTypes = {
    location: PropTypes.object,
    isLogged: PropTypes.bool.isRequired,
    onAuthTry: PropTypes.func.isRequired
}

export default Auth;

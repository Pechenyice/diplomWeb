import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import Auth from "../../presentational/Auth/Auth";

const AuthDisplay = connect(mapPropsToState, mapDispatchToState)(Auth);

function mapPropsToState(state) {
    return {
        isLogged: state.user.id === null ? false : true
    };
}

function mapDispatchToState(dispatch) {
    return {
        onAuthTry: () => {
            dispatch(actions.fetchAuth())
        },
        onSignUp: ({login, nick, pass}) => {
            dispatch(actions.fetchSignUp(login, nick, pass));
        }
    };
}

export default AuthDisplay;

import React from "react";
import { connect } from "react-redux";
import AuthorizedRoute from "../../helpers/AuthorizedRoute/AuthorizedRoute";

const AuthorizedRouteManager = connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);

function mapStateToProps(state, ownProps) {
    return {
        isLogged: state.user.id === null ? false : true
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default AuthorizedRouteManager;

import React from "react";
import { connect } from "react-redux";
import Auth from "../../presentational/Auth/Auth";

const AuthDisplay = connect(mapPropsToState, mapDispatchToState)(Auth);

function mapPropsToState(state) {
    return {};
}

function mapDispatchToState(dispatch) {
    return {};
}

export default AuthDisplay;

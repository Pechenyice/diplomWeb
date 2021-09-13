import React from "react";
import { connect } from "react-redux";
import actions from '../../../redux/actions';
import ErrorsSection from "../../presentational/ErrorsSection/ErrorsSection";

const ErrorsDisplay = connect(mapStateToProps, mapDispatchToProps)(ErrorsSection);

function mapStateToProps(state) {
    return {
        errors: state.errors.content
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRemoveError: id => {
            dispatch(actions.removeError(id));
        }
    };
}

export default ErrorsDisplay;

import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import CookieModal from "../../presentational/CookieModal/CookieModal";

const CookieDisplay = connect(mapPropsToState, mapDispatchToState)(CookieModal);

function mapPropsToState(state) {
    return {
        shouldHide: state.cookie
    };
}

function mapDispatchToState(dispatch) {
    return {
        onOk: () => {
            dispatch(actions.agreeWithCookie());
        }
    };
}

export default CookieDisplay;

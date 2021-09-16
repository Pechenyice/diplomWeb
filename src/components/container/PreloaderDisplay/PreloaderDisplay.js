import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import Preloader from "../../presentational/Preloader/Preloader";

const PreloaderDisplay = connect(mapStateToProps, mapDispatchToProps)(Preloader);

function mapStateToProps(state) {
    return {
        isChecking: state.user.auth.isChecking
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onInitAuthCheck: () => {
            dispatch(actions.fetchUserAuthCheck());
        }
    };
}

export default PreloaderDisplay;

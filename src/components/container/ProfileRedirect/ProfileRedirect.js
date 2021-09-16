import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import actions from "../../../redux/actions";
import Profile from "../../presentational/Profile/Profile";

const ProfileRedirect = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(Profile);

function mapStateToProps(state) {
    console.log('state.profilePlans', state.profilePlans)
    return {
        userId: state.user.id,
        cachedForUser: state.profilePlans.forUser,
        profilePlans: state.profilePlans
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

function mergePropsWithDispatch(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        onNeedLoadOwnPlans: () => {
            dispatchProps.dispatch(actions.fetchOwnPlans(stateProps.userId))
        }, 
        onNeedLoadLikedPlans: () => {
            dispatchProps.dispatch(actions.fetchLikedPlans(stateProps.userId))
        }, 
        onNeedLoadDislikedPlans: () => {
            dispatchProps.dispatch(actions.fetchDislikedPlans(stateProps.userId))
        }
    };
}

export default ProfileRedirect;

import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import Profile from "../../presentational/Profile/Profile";

const ProfileDisplay = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(Profile);

function mapStateToProps(state, ownProps) {
    return {
        userId: ownProps.match.params.userId,
        cachedLoadedForUser: state.profilePlans.forUser,
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

export default ProfileDisplay;

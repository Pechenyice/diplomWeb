import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import Profile from "../../presentational/Profile/Profile";

const ProfileDisplay = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(Profile);

function mapStateToProps(state, ownProps) {
    return {
        userId: ownProps.match.params.userId,
        businessman: state.user.id,
        login: null,
        nickname: state.guest.nickname,
        userDataIsLoading: state.guest.isLoading,
        cachedLoadedForUser: state.profilePlans.forUser,
        profilePlans: state.profilePlans,
        location: ownProps.location
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
        },
        onNeedUserNickname: () => {
            dispatchProps.dispatch(actions.fetchUserNickname(stateProps.userId))
        },
        onClear: () => {
            dispatchProps.dispatch(actions.clearGuest())
        },
        onLogout: () => {},
        onError: () => {},
        onSaveProfileData: () => {},
        onSaveProfilePassword: () => {}
    };
}

export default ProfileDisplay;

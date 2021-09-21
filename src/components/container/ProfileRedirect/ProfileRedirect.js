import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import actions from "../../../redux/actions";
import Profile from "../../presentational/Profile/Profile";

const ProfileRedirect = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(Profile);

function mapStateToProps(state, ownProps) {
    return {
        userId: state.user.id,
        businessman: state.user.id,
        login: state.user.login,
        nickname: state.user.nickname,
        userDataIsLoading: false,
        cachedForUser: state.profilePlans.forUser,
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
        onLogout: () => {
            dispatchProps.dispatch(actions.fetchLogout())
        },
        onError: (text) => {
            dispatchProps.dispatch(actions.addError(text))
        },
        onSaveProfileData: (nickname) => {
            dispatchProps.dispatch(actions.updateProfileData(nickname))
        },
        onSaveProfilePassword: (oldPass, pass) => {
            dispatchProps.dispatch(actions.updateProfilePassword(oldPass, pass))
        }
    };
}

export default ProfileRedirect;

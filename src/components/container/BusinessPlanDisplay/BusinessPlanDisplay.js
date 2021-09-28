import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import BusinessPlan from "../../presentational/BusinessPlan/BusinessPlan";

const BusinessPlanDisplay = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(BusinessPlan);

function mapStateToProps(state) {
    return {
        plan: state.plan,
        user: state.user.id,
        categories: state.categories,
        types: state.types
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onInit: () => {
            dispatch(actions.findPlan(ownProps.match.params));
        },
        onNullPlan: () => {
            dispatch(actions.fetchPlan(ownProps.match.params));
        },
        onClear: () => {
            dispatch(actions.clearPlanInfo());
        },
        onError: (text) => {
            dispatch(actions.addError(text));
        },
        onPublishComment: (businessesId, editionId, comment) => {
            dispatch(actions.fetchPublishComment(businessesId, editionId, comment));
        },
        onNeedServerData: () => {
            dispatch(actions.fetchCategories());
            dispatch(actions.fetchTypes());
        },
        onPlanDeleted: (businessesId, editionId) => {
            dispatch(actions.fetchDeletePlan(businessesId, editionId));
        },
        onUserReact: (reaction, bId, eId) => {
            dispatch(actions.fetchNewReaction(reaction, bId, eId));
        },
        dispatch
    }
}

function mergePropsWithDispatch(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        onNeedMoreComments: (businessesId, editionId) => {
            dispatchProps.dispatch(actions.fetchComments(businessesId, editionId, stateProps.plan.comments.offset, stateProps.plan.comments.count));
        }
    }
}

export default BusinessPlanDisplay;

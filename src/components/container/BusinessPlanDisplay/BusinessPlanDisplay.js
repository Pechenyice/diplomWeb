import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import BusinessPlan from "../../presentational/BusinessPlan/BusinessPlan";

const BusinessPlanDisplay = connect(mapStateToProps, mapDispatchToProps)(BusinessPlan);

function mapStateToProps(state) {
    console.log("STATE ", state.plan)
    return {
        plan: state.plan
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
        }
    }
}

function mergePropsWithDispatch(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        onNeedMoreComments: (businessesId, editionId) => {
            dispatchProps.dispatch(actions.fetchComments(businessesId, editionId, stateProps.plan.messages.offset, stateProps.plan.messages.count));
        }
    }
}

export default BusinessPlanDisplay;
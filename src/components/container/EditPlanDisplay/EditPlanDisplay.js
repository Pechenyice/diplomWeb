import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import PlanEditor from "../../presentational/PlanEditor/PlanEditor";

const EditPlanDisplay = connect(mapStateToProps, mapDispatchToProps)(PlanEditor);

function mapStateToProps(state, ownProps) {
    return {
        edition: true,
        planData: ownProps.location.state?.plan,
        plan: state.plan,
        user: state.user.id
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    console.log(ownProps.match)
    return {
        onClear: () => {
            dispatch(actions.clearPlanInfo());
        },
        onInit: () => {
            dispatch(actions.findPlan({
                planId: ownProps.match.params.planId,
                edId: ownProps.match.params.edId
            }));
        },
        onNullPlan: () => {
            dispatch(actions.fetchPlan({
                planId: ownProps.match.params.planId,
                edId: ownProps.match.params.edId
            }));
        },
        onNeedFetchEdition: () => {
            dispatch(actions.fetchEditionDataForPlanView(ownProps.match.params.planId, ownProps.match.params.edId))
        }
    };
}

export default EditPlanDisplay;

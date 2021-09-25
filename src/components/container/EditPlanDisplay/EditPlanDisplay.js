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
        user: state.user.id,
        categories: state.categories,
        types: state.types
    };
}

function mapDispatchToProps(dispatch, ownProps) {
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
        },
        onNeedCategories: () => {
            dispatch(actions.fetchCategories());
        },
        onNeedTypes: () => {
            dispatch(actions.fetchTypes());
        },
        onError: (text) => {
            dispatch(actions.addError(text))
        },
        onSubmit: (state) => {
            dispatch(actions.fetchPlanEditionCreated(Object.assign({}, state, {businessId: ownProps.match.params.planId})));
        }
    };
}

export default EditPlanDisplay;

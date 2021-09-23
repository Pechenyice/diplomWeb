import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import PlanEditor from "../../presentational/PlanEditor/PlanEditor";

const NewPlanDisplay = connect(mapStateToProps, mapDispatchToProps)(PlanEditor);

function mapStateToProps(state) {
    return {
        planData: null,
        categories: state.categories,
        types: state.types
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClear: () => {
            dispatch(actions.clearPlanInfo());
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
            dispatch(actions.addSuccess('Here will be success!'))
        }
    };
}

export default NewPlanDisplay;

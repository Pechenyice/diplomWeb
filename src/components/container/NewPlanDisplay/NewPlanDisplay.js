import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import PlanEditor from "../../presentational/PlanEditor/PlanEditor";

const NewPlanDisplay = connect(mapStateToProps, mapDispatchToProps)(PlanEditor);

function mapStateToProps(state) {
    return {
        planData: null
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClear: () => {
            dispatch(actions.clearPlanInfo());
        },
    };
}

export default NewPlanDisplay;

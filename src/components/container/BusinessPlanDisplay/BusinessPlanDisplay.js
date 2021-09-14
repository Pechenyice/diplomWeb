import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import BusinessPlan from "../../presentational/BusinessPlan/BusinessPlan";

const BusinessPlanDisplay = connect(mapStateToProps, mapDispatchToProps)(BusinessPlan);

function mapStateToProps(state) {
    return {
        businesses: state.businesses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNeedBusiness: (businessId, editionId) => {
            dispatch(actions.fetchBusiness(businessId, editionId));
        }
    }
}

function mergePropsWithDispatch(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        
    }
}

export default BusinessPlanDisplay;

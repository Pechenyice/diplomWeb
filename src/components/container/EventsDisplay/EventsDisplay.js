import React from "react";
import { connect } from "react-redux";
import actions from '../../../redux/actions';
import EventsSection from "../../presentational/EventsSection/EventsSection";

const EventsDisplay = connect(mapStateToProps, mapDispatchToProps)(EventsSection);

function mapStateToProps(state) {
    return {
        errors: state.errors.content,
        successes: state.successes.content
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRemoveError: id => {
            dispatch(actions.removeError(id));
        },
        onRemoveSuccess: id => {
            dispatch(actions.removeSuccess(id));
        }
    };
}

export default EventsDisplay;

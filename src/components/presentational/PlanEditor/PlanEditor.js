import React, { useEffect } from "react";
import styles from './PlanEditor.module.css';
import PropTypes from 'prop-types';
import { Redirect } from "react-router";

const PlanEditor = ({ planData, plan, user, edition, onClear, onInit, onNullPlan, onNeedFetchEdition, match }) => {
    useEffect(() => {
        return () => {
            onClear();
        }
    }, []);

    if (!planData && plan && plan.data === null && !plan.isChecked) onInit();

    if (!planData && plan && plan.data === null && plan.isChecked && !plan.isLoading && !plan.isFetched) onNullPlan();

    return (
        <section>
            {
                !edition ?
                    // creation of plan
                    <div>Creation of plan</div> :
                    //  edition of plan from plan edit button
                    planData ?
                        <div>
                            {
                                user !== match.params.ownerId ? <Redirect to={'/catalog'} /> : null
                            }
                            {
                                edition && !planData ? onNeedFetchEdition() : null
                            }
                            <div>Edition of plan</div>
                        </div> :
                        // edition on load plan template
                        plan.isLoading ?
                            <div>LOADING</div> :
                            plan.data ?
                                <div>
                                    {
                                        user !== match.params.ownerId ? <Redirect to={'/catalog'} /> : null
                                    }
                                    <div>
                                        {plan.data.name}
                                    </div>
                                    <div>
                                        {plan.data.category}
                                    </div>
                                    <div>
                                        {plan.data.type}
                                    </div>
                                    <div>
                                        {plan.data.description}
                                    </div>
                                    <div>
                                        {plan.data.created}
                                    </div>
                                    <div>
                                        {plan.data.likes} {plan.data.dislikes}
                                    </div>
                                    <div>
                                        income: {plan.data.income.sum} {plan.data.income.text}
                                    </div>
                                    <div>
                                        expence: {plan.data.expence.sum} {plan.data.expence.text}
                                    </div>
                                </div> :
                                <div>NO DATA</div>
            }

        </section>
    );
}

PlanEditor.propTypes = {
    planData: PropTypes.any,
    user: PropTypes.string,
    edition: PropTypes.bool,
    onClear: PropTypes.func,
    onNeedFetchEdition: PropTypes.func,
    onInit: PropTypes.func,
    onNullPlan: PropTypes.func,
    match: PropTypes.object
}

export default PlanEditor;

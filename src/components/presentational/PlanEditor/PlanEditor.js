import React, { useEffect } from "react";
import styles from './PlanEditor.module.css';
import PropTypes from 'prop-types';
import { Redirect } from "react-router";
import Client from "../../../Client/Client";
import PlanCreation from "./PlanCreation";

const PlanEditor = ({ planData, plan, user, edition, onClear, onInit, onNullPlan, onNeedFetchEdition, match, categories, types, onNeedCategories, onNeedTypes, onSubmit, onError }) => {
    useEffect(() => {
        if (!categories.content.length && !categories.isLoading) onNeedCategories();
		if (!types.content.length && !types.isLoading) onNeedTypes();

        return () => {
            Client.abortLoadPlanFetch();
            // Client.abort
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
                    <PlanCreation categories={categories} types={types} onSubmit={onSubmit} onError={onError}/> :
                    //  edition of plan from plan edit button
                    planData ?
                        <div>
                            {
                                user !== match.params.ownerId ? <Redirect to={'/catalog'} /> : null
                            }
                            {
                                edition && !planData ? onNeedFetchEdition() : <PlanCreation plan={planData} categories={categories} types={types} onSubmit={onSubmit} onError={onError}/> 
                            }
                            
                        </div> :
                        // edition on load plan template
                        plan.isLoading ?
                            <div>LOADING</div> :
                            plan.data ?
                                <div>
                                    {
                                        user !== match.params.ownerId ? <Redirect to={'/catalog'} /> : null
                                    }
                                    <PlanCreation plan={Object.assign({}, {data: plan.data.plan})} categories={categories} types={types} onSubmit={onSubmit} onError={onError}/>
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
    match: PropTypes.object,
    categories: PropTypes.object, 
    types: PropTypes.object, 
    onNeedCategories: PropTypes.func, 
    onNeedTypes: PropTypes.func,
    onSubmit: PropTypes.func,
	onError: PropTypes.func,
    plan: PropTypes.any
}

export default PlanEditor;

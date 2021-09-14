import React, { useEffect } from "react";
import styles from './BusinessPlan.module.css';

const BusinessPlan = ({ plan, onInit, onNullPlan, onClear, onNeedMoreComments }) => {

    useEffect(() => {
        return () => {
            onClear();
        }
    }, []);

    if (plan.data === null && !plan.isChecked) onInit();

    if (plan.data === null && plan.isChecked && !plan.isLoading && !plan.isFetched) onNullPlan();

    return (
        <section>
            {
                plan.isLoading ?
                    <div>LOADING</div> :
                    plan.data ?
                        <div>
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
    )
}

export default BusinessPlan;

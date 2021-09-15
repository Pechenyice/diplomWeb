import React, { useEffect } from "react";
import styles from './BusinessPlan.module.css';

const BusinessPlan = ({ plan, onInit, onNullPlan, onClear, onNeedMoreComments, onNeedInitialComments }) => {

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
                            {
                                plan.comments.content.map(e => (<div key={e.id}>{e.text} {e.author.nickname}</div>))
                            }
                            <div>
                                {
                                    !plan.comments.offset && !plan.comments.isLoading ? onNeedMoreComments(plan.activeBusiness, plan.activeEdition) : null
                                }
                                {
                                    plan.comments.needMore && !plan.comments.isLoading ? <div onClick={() => { onNeedMoreComments(plan.activeBusiness, plan.activeEdition); }}>load more comments</div> : plan.comments.needMore ? 'COMMENTS LOADING' : null
                                }
                            </div>
                        </div> :
                        <div>NO DATA</div>
            }
        </section>
    )
}

export default BusinessPlan;

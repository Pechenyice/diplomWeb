import React, { useEffect, useState } from "react";
import styles from './BusinessPlan.module.css';
import PropTypes from 'prop-types';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Client from "../../../Client/Client";
import SummaryStat from "./SummaryStat";
import Comment from "./Comment";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Graph from "../../helpers/AuthorizedRoute/Graph";

const BusinessPlan = ({ plan, user, onInit, onNullPlan, onClear, onError, onPublishComment, onNeedMoreComments, categories, types, onNeedServerData }) => {

    const IS_PROFITABLE = plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance < plan?.data?.income?.profit;

    const MONTHS = Math.ceil((plan?.data?.expence?.amortization + plan?.data?.expence?.materials) / (plan?.data?.income?.profit - (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance)));

    const SPENDINGS = IS_PROFITABLE ?
        (plan?.data?.expence?.amortization + plan?.data?.expence?.materials) + (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance) * MONTHS :
        (plan?.data?.expence?.amortization + plan?.data?.expence?.materials) + (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance) * 12;

    const INCOMINGS = IS_PROFITABLE ?
        plan?.data?.income?.profit * MONTHS :
        plan?.data?.income?.profit * 12;

    const GRAPH_PAYBACK_DATA = {
        labels: ['0 months', `${IS_PROFITABLE ? MONTHS : 12} months`, `${IS_PROFITABLE ? MONTHS * 2 : 12 * 2} months`],
        datasets: [
            {
                label: "Incomings",
                borderColor: 'green',
                data: [0,
                    IS_PROFITABLE ? plan?.data?.income?.profit * MONTHS : plan?.data?.income?.profit * 12,
                    IS_PROFITABLE ? plan?.data?.income?.profit * MONTHS * 2 : plan?.data?.income?.profit * 12 * 2
                ],
            },
            {
                label: "Expences",
                borderColor: 'red',
                data: [
                    plan?.data?.expence?.amortization + plan?.data?.expence?.materials,
                    plan?.data?.expence?.amortization + plan?.data?.expence?.materials + (IS_PROFITABLE ? (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance) * MONTHS : (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance) * 12),
                    plan?.data?.expence?.amortization + plan?.data?.expence?.materials + (IS_PROFITABLE ? (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance) * MONTHS * 2 : (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance) * 12 * 2),
                ],
            }
        ]
    }

    const GRAPH_PAYBACK_OPTIONS = {
        tooltips: {
            enabled: false
        },
        // hover: {
        //     mode: null
        // },
        // events: [],
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            showTooltips: false,
            // events: [],
            tooltips: {
                enabled: false
            },

        },
    }

    const LEGEND_OPTIONS = {
        salary: {
            color: 'rgba(255, 99, 132, 1)',
            amount: (IS_PROFITABLE ? plan?.data?.expence?.salary * MONTHS : plan?.data?.expence?.salary * 12)
        },
        electricity: {
            color: 'rgba(54, 0, 235, 1)',
            amount: (IS_PROFITABLE ? plan?.data?.expence?.electricity * MONTHS : plan?.data?.expence?.electricity * 12)
        },
        amortization: {
            color: 'rgba(255, 206, 86, 1)',
            amount: plan?.data?.expence?.amortization
        },
        materials: {
            color: 'rgba(0, 99, 132, 1)',
            amount: plan?.data?.expence?.materials
        },
        maintenance: {
            color: 'rgba(123, 162, 235, 1)',
            amount: (IS_PROFITABLE ? plan?.data?.expence?.maintenance * MONTHS : plan?.data?.expence?.maintenance * 12)
        }
    }

    const GRAPH_SPENDINGS_DATA = {
        labels: ["Salary", "Electricity", "Amortization", "Materials", "Maintenance"],
        datasets: [
            {
                label: "% of all spendings",
                data: [
                    (IS_PROFITABLE ? plan?.data?.expence?.salary * MONTHS : plan?.data?.expence?.salary * 12) / SPENDINGS * 100,
                    (IS_PROFITABLE ? plan?.data?.expence?.electricity * MONTHS : plan?.data?.expence?.electricity * 12) / SPENDINGS * 100,
                    (plan?.data?.expence?.amortization) / SPENDINGS * 100,
                    (plan?.data?.expence?.materials) / SPENDINGS * 100,
                    (IS_PROFITABLE ? plan?.data?.expence?.maintenance * MONTHS : plan?.data?.expence?.maintenance * 12) / SPENDINGS * 100,
                ],
                borderWidth: 10,
                backgroundColor: [
                    LEGEND_OPTIONS.salary.color,
                    LEGEND_OPTIONS.electricity.color,
                    LEGEND_OPTIONS.amortization.color,
                    LEGEND_OPTIONS.materials.color,
                    LEGEND_OPTIONS.maintenance.color
                ]
            }
        ]
    }

    const GRAPH_SPENDINGS_OPTIONS = {
        cutout: 100,
        tooltips: {
            // enabled: false,
            borderWidth: 0
        },
        hover: {
            mode: null
        },
        // events: [],
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            // showTooltips: false,
            // events: [],
            // tooltips: {
            //     enabled: false,
            //     borderWidth: 0
            // },

        },
    }

    useEffect(() => {
        if ((!categories.content.length && !categories.isLoading) || (!types.content.length && !types.isLoading)) {
            onNeedServerData();
        }
    }, [categories, types]);

    useEffect(() => {
        return () => {
            Client.abortLoadPlanFetch();
            Client.abortLoadCommentsFetch();
            onClear();
        }
    }, []);

    if (plan.data === null && !plan.isChecked) onInit();

    if (plan.data === null && plan.isChecked && !plan.isLoading && !plan.isFetched) onNullPlan();

    let [comment, setComment] = useState('');

    function handleCommentInput(e) {
        setComment(e.target.value);
    }

    function validate(text) {
        if (!text) return 'Comment must not be empty!';
        if (text.length < 10) return 'Comment must be at least 10 symbols long!';
        return '';
    }

    function handleCommentSubmit() {
        if (!validate(comment)) {
            onPublishComment(plan.activeBusiness, plan.activeEdition, comment);
            setComment('');
        } else {
            onError(validate(comment))
        }
    }

    function getHumanizedMonth(n) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[n]
    }

    function humanizeDate(ts) {
        var dt = new Date(+ts);

        return `${getHumanizedMonth(dt.getMonth())} ${dt.getDate()}, ${dt.getFullYear()} ${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}`;
    }

    return (
        <section className={[
            'sectionDimensioned',
        ].join(" ")}>
            {
                console.log('!plan.isLoading && categories.content.length && types.content.length',
                    !plan.isLoading && categories.content.length && types.content.length,
                    !plan.isLoading,
                    categories.content.length,
                    types.content.length)
            }
            {
                !plan.isLoading && categories.content.length && types.content.length ?
                    plan.data ?
                        <section>
                            <section>
                                <div className={[styles.planWrapperMain, styles.planWrapperFlex].join(' ')}>
                                    <div>
                                        <h1 className={styles.upperCase}>{plan.data.name}</h1>
                                        {
                                            plan.activeOwner === user ?
                                                <Link to={{
                                                    pathname: `/editPlan/plan/${plan.activeBusiness}/ed/${plan.activeEdition}/owner/${plan.activeOwner}`,
                                                    state: { plan }
                                                }}>
                                                    <div>'canEdit'</div>
                                                </Link> :
                                                // <div>'not mine'</div>
                                                null
                                        }
                                        <p className={styles.creationDate}>
                                            Edition created: {humanizeDate(plan.data.created)}
                                        </p>
                                        <div className={styles.reactionsWrapper}>
                                            <div className={styles.reaction}>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.83317 18.3333H3.33317C2.89114 18.3333 2.46722 18.1577 2.15466 17.8452C1.8421 17.5326 1.6665 17.1087 1.6665 16.6667V10.8333C1.6665 10.3913 1.8421 9.96737 2.15466 9.65481C2.46722 9.34225 2.89114 9.16666 3.33317 9.16666H5.83317M11.6665 7.49999V4.16666C11.6665 3.50362 11.4031 2.86773 10.9343 2.39889C10.4654 1.93005 9.82954 1.66666 9.1665 1.66666L5.83317 9.16666V18.3333H15.2332C15.6351 18.3379 16.0252 18.197 16.3314 17.9367C16.6377 17.6763 16.8396 17.3141 16.8998 16.9167L18.0498 9.41666C18.0861 9.17779 18.07 8.93389 18.0026 8.70187C17.9353 8.46984 17.8183 8.25524 17.6597 8.07292C17.5012 7.8906 17.3049 7.74493 17.0845 7.646C16.8641 7.54708 16.6248 7.49725 16.3832 7.49999H11.6665Z"
                                                        stroke="#101010"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                {
                                                    <p className={styles.emotions}>
                                                        {plan.data.likes}
                                                    </p>
                                                }
                                            </div>
                                            <div className={styles.reaction}>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14.1668 1.66668H16.6668C17.1089 1.66668 17.5328 1.84227 17.8453 2.15483C18.1579 2.46739 18.3335 2.89132 18.3335 3.33334V9.16668C18.3335 9.6087 18.1579 10.0326 17.8453 10.3452C17.5328 10.6577 17.1089 10.8333 16.6668 10.8333H14.1668M8.3335 12.5V15.8333C8.3335 16.4964 8.59689 17.1323 9.06573 17.6011C9.53457 18.07 10.1705 18.3333 10.8335 18.3333L14.1668 10.8333V1.66668H4.76683C4.36489 1.66213 3.97485 1.80301 3.66857 2.06334C3.3623 2.32367 3.16043 2.68592 3.10016 3.08334L1.95016 10.5833C1.91391 10.8222 1.93002 11.0661 1.99738 11.2981C2.06474 11.5302 2.18174 11.7448 2.34028 11.9271C2.49882 12.1094 2.6951 12.2551 2.91552 12.354C3.13594 12.4529 3.37524 12.5027 3.61683 12.5H8.3335Z"
                                                        stroke="#101010"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                {
                                                    <p className={styles.emotions}>
                                                        {plan.data.dislikes}
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.textBlock}>
                                            <h2 className={styles.subTitle}>Basic information</h2>
                                            <p className={styles.text}>{plan.data.description}</p>
                                        </div>
                                        <div className={styles.textBlock}>
                                            <h2 className={styles.subTitle}>What is the money spent on?</h2>
                                            <p className={styles.text}>{plan.data.income.description || 'No data...'}</p>
                                        </div>
                                        <div className={styles.textBlock}>
                                            <h2 className={styles.subTitle}>How will the business make money?</h2>
                                            <p className={styles.text}>{plan.data.expence.description || 'No data...'}</p>
                                        </div>
                                        <div className={styles.textBlock}>
                                            <h2 className={styles.subTitle}>Versions history ({ })</h2>
                                            <p className={styles.text}>{plan.data.expence.description || 'No data...'}</p>
                                        </div>
                                    </div>
                                    <div className={styles.graphWrapper}>
                                        {
                                            IS_PROFITABLE ?
                                                <div className={[styles.graphElem, styles.graphElemBig].join(' ')}>
                                                    <h2 className={styles.subTitle}>payback schedule, in $</h2>
                                                    <Graph type='line' data={GRAPH_PAYBACK_DATA} options={GRAPH_PAYBACK_OPTIONS} style={{ width: '100%' }} />
                                                    <div className={styles.grapghExplanationWrapper}>
                                                        <div className={styles.grapghExplanationMain}>This business will pay off in {MONTHS} months</div>
                                                        <div className={styles.grapghExplanationHint}>and will have an estimated income of {(plan?.data?.income?.profit - (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance))}$</div>
                                                    </div>
                                                </div> :
                                                <div className={styles.graphElem}>
                                                    <p className={styles.graphSad}>:(</p>
                                                    <div className={styles.grapghExplanationWrapper}>
                                                        <div className={styles.grapghExplanationMain}>This business will never pay off</div>
                                                        <div className={styles.grapghExplanationHint}>and will eat {(plan?.data?.income?.profit - (plan?.data?.expence?.salary + plan?.data?.expence?.electricity + plan?.data?.expence?.maintenance))}$ a month</div>
                                                    </div>
                                                </div>
                                        }
                                        <div className={styles.graphElem}>
                                            <h2 className={styles.subTitle}>Spendings, in %</h2>
                                            {
                                                !IS_PROFITABLE ?
                                                    <h3 className={styles.chartHint}>Calculated for {12} months</h3> :
                                                    <h3 className={styles.chartHint}>Calculated for {MONTHS} months</h3>
                                            }
                                            <Graph type='doughnut' data={GRAPH_SPENDINGS_DATA} options={GRAPH_SPENDINGS_OPTIONS} style={{ width: '100%' }} />
                                            <div className={styles.graphLegendsWrapper}>
                                                {
                                                    Object.keys(LEGEND_OPTIONS).map((e, i) => (
                                                        <div key={i} className={styles.graphLegend}>
                                                            <div className={styles.legendElem}>
                                                                <div className={styles.legendColor} style={{ backgroundColor: LEGEND_OPTIONS[e].color }}></div>
                                                                <div className={styles.legendText}>{e}: {LEGEND_OPTIONS[e].amount}$</div>
                                                            </div>
                                                        </div>))
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                            <section className={styles.darkSide}>
                                <div className={styles.planWrapper}>
                                    <div className={styles.summaryWrapper}>
                                        <div className={styles.summaryBlock}>
                                            <h2 className={[styles.subTitle, styles.light].join(' ')}>Basic</h2>
                                            <div className={styles.summaryContent}>
                                                <SummaryStat header={'category'} content={<p className={styles.summaryText}>{categories.content[plan.data.category].name}</p>} style={{ width: '150px' }} />
                                                <SummaryStat header={'type'} content={<p className={styles.summaryText}>{types.content[plan.data.type].name}</p>} style={{ width: '150px' }} />
                                                <SummaryStat header={'author'} content={
                                                    <Link to={`/profile/${plan.activeOwner}/own`} >
                                                        <div className={styles.summaryFlexWrapper}>
                                                            <p className={styles.summaryText}>Gerundos</p>
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M14.166 14.1667V5.83337M14.166 5.83337H5.83268M14.166 5.83337L5.83268 14.1667" stroke="white" strokeLinecap="square" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                } style={{ width: '150px' }} />
                                            </div>
                                        </div>
                                        <div className={styles.summaryBlock}>
                                            <h2 className={[styles.subTitle, styles.light].join(' ')}>Spending</h2>
                                            <div className={styles.summaryContent}>
                                                <SummaryStat header={'salary, month'} content={<p className={styles.summaryText}>{plan.data.expence.salary}$</p>} style={{ width: '150px' }} />
                                                <SummaryStat header={'electricity, month'} content={<p className={styles.summaryText}>{plan.data.expence.electricity}$</p>} style={{ width: '150px' }} />
                                                <SummaryStat header={'amortization'} content={<p className={styles.summaryText}>{plan.data.expence.amortization}$</p>} style={{ width: '150px' }} />
                                                <SummaryStat header={'materials'} content={<p className={styles.summaryText}>{plan.data.expence.materials}$</p>} style={{ width: '150px' }} />
                                                <SummaryStat header={'maintenance, month'} content={<p className={styles.summaryText}>{plan.data.expence.maintenance}$</p>} style={{ width: '150px' }} />
                                            </div>
                                        </div>
                                        <div className={styles.summaryBlock}>
                                            <h2 className={[styles.subTitle, styles.light].join(' ')}>Incoming</h2>
                                            <div className={styles.summaryContent}>
                                                <SummaryStat header={'profit, month'} content={<p className={styles.summaryText}>{plan.data.income.profit}$</p>} style={{ width: '150px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles.commentsWrapper}>
                                <div className={[styles.planWrapper].join(' ')}>
                                    <div className={styles.commentsBlockWrapper}>
                                        <h2 className={styles.subTitle}>Comments</h2>

                                        <div className={styles.commentsContent}>
                                            {
                                                plan.comments.content.map(e => (<Comment key={e.id} author={e.author} text={e.text} created={e.created} />))
                                            }
                                            <div>
                                                {
                                                    !plan.comments.offset && !plan.comments.isLoading ? onNeedMoreComments(plan.activeBusiness, plan.activeEdition) : null
                                                }
                                                {
                                                    plan.comments.needMore && !plan.comments.isLoading ? <div onClick={() => { onNeedMoreComments(plan.activeBusiness, plan.activeEdition); }}><p className={styles.commentsEvent}>load more comments</p></div> : plan.comments.needMore ? <p className={styles.commentsEvent}>COMMENTS LOADING</p> : !plan.comments.content.length ? <p className={styles.commentsEventHint}>Write first comment!</p> : null
                                                }
                                            </div>
                                        </div>

                                        <div className={styles.commentsControls}>
                                            <div className={styles.commentsInput}>
                                                <Input id={'commentsInput'} label={'Write a comment...'} isEmpty={!comment.length} value={comment} onChange={handleCommentInput} />
                                            </div>
                                            <div className={styles.commentsButton}>
                                                <Button text={
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.74764 12.8082L9.29123 13.7595C9.63728 14.3651 9.81031 14.6679 9.81031 14.9999C9.81031 15.3318 9.63728 15.6346 9.29123 16.2402L8.74764 17.1915C7.19976 19.9003 6.42582 21.2547 7.02935 21.9263C7.63288 22.598 9.06202 21.9727 11.9203 20.7222L19.7648 17.2903C22.0092 16.3084 23.1314 15.8174 23.1314 14.9999C23.1314 14.1824 22.0092 13.6914 19.7648 12.7095L11.9203 9.27751C9.06202 8.02701 7.63288 7.40176 7.02935 8.07341C6.42582 8.74506 7.19976 10.0995 8.74764 12.8082Z" stroke="white" stroke-width="1.25" />
                                                    </svg>
                                                } onClick={handleCommentSubmit} style={{ height: '60px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                        :
                        <div>NO DATA</div>
                    : <div>LOADING</div>
            }
        </section>
    )
}

BusinessPlan.propTypes = {
    plan: PropTypes.object,
    user: PropTypes.string,
    onInit: PropTypes.func,
    onNullPlan: PropTypes.func,
    onClear: PropTypes.func,
    onError: PropTypes.func,
    onPublishComment: PropTypes.func,
    onNeedMoreComments: PropTypes.func,
    categories: PropTypes.array,
    types: PropTypes.array,
    onNeedServerData: PropTypes.func
}

export default BusinessPlan;

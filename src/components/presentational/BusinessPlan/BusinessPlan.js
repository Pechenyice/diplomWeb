import React, { useEffect, useState } from "react";
import styles from "./BusinessPlan.module.css";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Client from "../../../Client/Client";
import SummaryStat from "./SummaryStat";
import Comment from "./Comment";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../Select/Select";
import Graph from "../../helpers/AuthorizedRoute/Graph";
import BusinessTag from "../BusinessTag/BusinessTag";
import { CSSTransition } from "react-transition-group";
import SVGManager from "../../../svgs/svgs";

const BusinessPlan = ({
	plan,
	user,
	onInit,
	onNullPlan,
	onClear,
	onError,
	onPublishComment,
	onNeedMoreComments,
	categories,
	types,
	onNeedServerData,
	onPlanDeleted,
	onUserReact,
	planActions,
}) => {
	const IS_PROFITABLE =
		plan?.data?.expence?.salary +
			plan?.data?.expence?.electricity +
			plan?.data?.expence?.maintenance <
		plan?.data?.income?.profit;

	const MONTHS = Math.ceil(
		(plan?.data?.expence?.amortization + plan?.data?.expence?.materials) /
			(plan?.data?.income?.profit -
				(plan?.data?.expence?.salary +
					plan?.data?.expence?.electricity +
					plan?.data?.expence?.maintenance))
	);

	const SPENDINGS = IS_PROFITABLE
		? plan?.data?.expence?.amortization +
		  plan?.data?.expence?.materials +
		  (plan?.data?.expence?.salary +
				plan?.data?.expence?.electricity +
				plan?.data?.expence?.maintenance) *
				MONTHS
		: plan?.data?.expence?.amortization +
		  plan?.data?.expence?.materials +
		  (plan?.data?.expence?.salary +
				plan?.data?.expence?.electricity +
				plan?.data?.expence?.maintenance) *
				12;

	const INCOMINGS = IS_PROFITABLE
		? plan?.data?.income?.profit * MONTHS
		: plan?.data?.income?.profit * 12;

	const GRAPH_PAYBACK_DATA = {
		labels: [
			"0 months",
			`${IS_PROFITABLE ? MONTHS : 12} months`,
			`${IS_PROFITABLE ? MONTHS * 2 : 12 * 2} months`,
		],
		datasets: [
			{
				label: "Incomings",
				borderColor: "#02F1E3",
				data: [
					0,
					IS_PROFITABLE
						? plan?.data?.income?.profit * MONTHS
						: plan?.data?.income?.profit * 12,
					IS_PROFITABLE
						? plan?.data?.income?.profit * MONTHS * 2
						: plan?.data?.income?.profit * 12 * 2,
				],
			},
			{
				label: "Expences",
				borderColor: "#FF708B",
				data: [
					plan?.data?.expence?.amortization +
						plan?.data?.expence?.materials,
					plan?.data?.expence?.amortization +
						plan?.data?.expence?.materials +
						(IS_PROFITABLE
							? (plan?.data?.expence?.salary +
									plan?.data?.expence?.electricity +
									plan?.data?.expence?.maintenance) *
							  MONTHS
							: (plan?.data?.expence?.salary +
									plan?.data?.expence?.electricity +
									plan?.data?.expence?.maintenance) *
							  12),
					plan?.data?.expence?.amortization +
						plan?.data?.expence?.materials +
						(IS_PROFITABLE
							? (plan?.data?.expence?.salary +
									plan?.data?.expence?.electricity +
									plan?.data?.expence?.maintenance) *
							  MONTHS *
							  2
							: (plan?.data?.expence?.salary +
									plan?.data?.expence?.electricity +
									plan?.data?.expence?.maintenance) *
							  12 *
							  2),
				],
			},
		],
	};

	const GRAPH_PAYBACK_OPTIONS = {
		tooltips: {
			enabled: false,
		},
		// hover: {
		//     mode: null
		// },
		// events: [],
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			showTooltips: false,
			// events: [],
			tooltips: {
				enabled: false,
			},
		},
	};

	const LEGEND_OPTIONS = {
		salary: {
			color: "#FFBA69",
			amount: IS_PROFITABLE
				? plan?.data?.expence?.salary * MONTHS
				: plan?.data?.expence?.salary * 12,
		},
		electricity: {
			color: "#02F1E3",
			amount: IS_PROFITABLE
				? plan?.data?.expence?.electricity * MONTHS
				: plan?.data?.expence?.electricity * 12,
		},
		amortization: {
			color: "#8676FF",
			amount: plan?.data?.expence?.amortization,
		},
		materials: {
			color: "#1973F9",
			amount: plan?.data?.expence?.materials,
		},
		maintenance: {
			color: "#FF708B",
			amount: IS_PROFITABLE
				? plan?.data?.expence?.maintenance * MONTHS
				: plan?.data?.expence?.maintenance * 12,
		},
	};

	const GRAPH_SPENDINGS_DATA = {
		labels: [
			"Salary",
			"Electricity",
			"Amortization",
			"Materials",
			"Maintenance",
		],
		datasets: [
			{
				label: "% of all spendings",
				data: [
					((IS_PROFITABLE
						? plan?.data?.expence?.salary * MONTHS
						: plan?.data?.expence?.salary * 12) /
						SPENDINGS) *
						100,
					((IS_PROFITABLE
						? plan?.data?.expence?.electricity * MONTHS
						: plan?.data?.expence?.electricity * 12) /
						SPENDINGS) *
						100,
					(plan?.data?.expence?.amortization / SPENDINGS) * 100,
					(plan?.data?.expence?.materials / SPENDINGS) * 100,
					((IS_PROFITABLE
						? plan?.data?.expence?.maintenance * MONTHS
						: plan?.data?.expence?.maintenance * 12) /
						SPENDINGS) *
						100,
				],
				borderWidth: 10,
				backgroundColor: [
					LEGEND_OPTIONS.salary.color,
					LEGEND_OPTIONS.electricity.color,
					LEGEND_OPTIONS.amortization.color,
					LEGEND_OPTIONS.materials.color,
					LEGEND_OPTIONS.maintenance.color,
				],
			},
		],
	};

	const GRAPH_SPENDINGS_OPTIONS = {
		cutout: 70,
		tooltips: {
			// enabled: false,
			borderWidth: 0,
		},
		hover: {
			mode: null,
		},
		// events: [],
		plugins: {
			legend: {
				display: false,
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
	};

	let [needReRender, setNeedReRender] = useState(false);

	useEffect(() => {
		if (
			(!categories.content.length && !categories.isLoading) ||
			(!types.content.length && !types.isLoading)
		) {
			onNeedServerData();
		}
	}, [categories, types]);

	useEffect(() => {
		return () => {
			Client.abortLoadPlanFetch();
			Client.abortLoadCommentsFetch();
			onClear();
			setNeedReRender(false);
		};
	}, [needReRender]);

	if (plan.data === null && !plan.isChecked) onInit();

	if (
		plan.data === null &&
		plan.isChecked &&
		!plan.isLoading &&
		!plan.isFetched
	)
		onNullPlan();

	let [comment, setComment] = useState("");

	function handleCommentInput(e) {
		setComment(e.target.value);
	}

	function validate(text) {
		if (!text) return "Comment must not be empty!";
		if (text.length < 10)
			return "Comment must be at least 10 symbols long!";
		return "";
	}

	function handleCommentSubmit() {
		if (!validate(comment)) {
			onPublishComment(plan.activeBusiness, plan.activeEdition, comment);
			setComment("");
		} else {
			onError(validate(comment));
		}
	}

	function getHumanizedMonth(n) {
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		return monthNames[n];
	}

	function humanizeDate(ts) {
		var dt = new Date(+ts);

		return `${getHumanizedMonth(
			dt.getMonth()
		)} ${dt.getDate()}, ${dt.getFullYear()} ${dt.getHours()}:${(
			"0" + dt.getMinutes()
		).slice(-2)}`;
	}

	let [activeEdition, setActiveEdition] = useState(plan.activeEdition);

	let [showPopup, setShowPopup] = useState(false);

	function handleEditionsChange(id) {
		setActiveEdition(id);
	}

	function handleReRenderEdition() {
		if (!activeEdition) {
			setActiveEdition(plan.activeEdition);
		}
		if (activeEdition !== plan.activeEdition) {
			setNeedReRender(true);
		} else {
			onError("It is already this edition!");
		}
	}

	let [planDeleted, setPlanDeleted] = useState(false);

	function handleDeletePlan() {
		onPlanDeleted(plan.activeBusiness, plan.activeEdition);
		setPlanDeleted(true);
	}

	function handleSetLike() {
		if (!plan.data.liked) {
			onUserReact("like", plan.activeBusiness, plan.activeEdition);
		}
	}

	function handleSetDislike() {
		if (!plan.data.disliked) {
			onUserReact("dislike", plan.activeBusiness, plan.activeEdition);
		}
	}

	function handleDropLike() {
		if (plan.data.liked) {
			onUserReact("dropLike", plan.activeBusiness, plan.activeEdition);
		}
	}

	function handleDropDislike() {
		if (plan.data.disliked) {
			onUserReact("dropDislike", plan.activeBusiness, plan.activeEdition);
		}
	}

	function handleShowPopup() {
		setShowPopup(true);
	}

	function handleClosePopup() {
		setShowPopup(false);
	}

	function handleStopPropagation(e) {
		e.stopPropagation();
	}

	return (
		<section className={["sectionDimensioned"].join(" ")}>
			<CSSTransition
				in={showPopup}
				timeout={300}
				classNames={"popup"}
				unmountOnExit
			>
				<div className={styles.popupWrapper} onClick={handleClosePopup}>
					<div
						className={styles.popupWindow}
						onClick={handleStopPropagation}
					>
						<p className={styles.popupMain}>Delete?</p>
						<p className={styles.popupHint}>
							business and all it's editions
						</p>
						<div className={styles.popupControls}>
							<Button text={"no"} onClick={handleClosePopup} />
							<p
								className={styles.deletion}
								onClick={handleDeletePlan}
							>
								Yes
							</p>
						</div>
						<div
							className={styles.popupClose}
							onClick={handleClosePopup}
						>
							<svg
								width="39"
								height="40"
								viewBox="0 0 39 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="10.3652"
									y="9.58775"
									width="27.3404"
									height="1.36702"
									transform="rotate(45 10.3652 9.58775)"
									fill="#101010"
								/>
								<rect
									x="9.39844"
									y="28.9203"
									width="27.3404"
									height="1.36702"
									transform="rotate(-45 9.39844 28.9203)"
									fill="#101010"
								/>
							</svg>
						</div>
					</div>
					{/* onClick={handleDeletePlan} */}
				</div>
			</CSSTransition>
			{!plan.isLoading &&
			categories.content.length &&
			types.content.length ? (
				plan.data ? (
					<section>
						{needReRender && (
							<Redirect
								push
								to={`/plan/${plan.activeBusiness}/ed/${activeEdition}/`}
							/>
						)}
						{planDeleted && (
							<Redirect
								push
								to={`/profile/${plan.activeOwner}/own`}
							/>
						)}
						<section>
							<div className={[styles.planWrapperMain].join(" ")}>
								<h1 className={styles.upperCase}>
									{plan.data.name}
								</h1>
								<div className={styles.planWrapperFlexMain}>
									{plan.activeOwner === user ? (
										<div className={styles.controlsWrapper}>
											<div
												className={
													styles.controlsControl
												}
											>
												<Link
													to={{
														pathname: `/editPlan/plan/${plan.activeBusiness}/ed/${plan.activeEdition}/owner/${plan.activeOwner}`,
														state: { plan },
													}}
												>
													<Button text={"Edit"} />
												</Link>
											</div>
											<div
												className={[
													styles.controlsControl,
													styles.controlsControlBig,
												].join(" ")}
											>
												<div>
													<p
														className={
															styles.deletion
														}
														onClick={
															handleShowPopup
														}
													>
														Delete
													</p>
												</div>
											</div>
										</div>
									) : // <div>'not mine'</div>
									null}
									<p className={styles.creationDate}>
										Edition created:{" "}
										{humanizeDate(plan.data.created)}
									</p>
									<div className={styles.planTagsWrapper}>
										<BusinessTag
											theme={"type"}
											text={
												types.content.find((e) => {
													return (
														e.id === plan.data.type
													);
												}).name
											}
										/>
										<BusinessTag
											theme={"category"}
											text={
												categories.content.find((e) => {
													return (
														e.id ===
														plan.data.category
													);
												}).name
											}
										/>
									</div>
									<div className={styles.reactionsWrapper}>
										{planActions.reactionIsUpdating && (
											<div className={"userActionLocker"}>
												{SVGManager.getSvg("lockerSvg")}
											</div>
										)}
										<div className={styles.reaction}>
											{plan.data.liked ? (
												<svg
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													onClick={handleDropLike}
												>
													<path
														d="M11.666 7.5V4.16667C11.666 3.50363 11.4026 2.86774 10.9338 2.3989C10.4649 1.93006 9.82906 1.66667 9.16602 1.66667L5.83268 9.16667V18.3333H15.2327C15.6346 18.3379 16.0247 18.197 16.3309 17.9367C16.6372 17.6763 16.8391 17.3141 16.8993 16.9167L18.0493 9.41667C18.0856 9.1778 18.0695 8.9339 18.0021 8.70188C17.9348 8.46985 17.8178 8.25525 17.6592 8.07293C17.5007 7.89061 17.3044 7.74494 17.084 7.64602C16.8636 7.54709 16.6243 7.49727 16.3827 7.5H11.666ZM5.83268 18.3333H3.33268C2.89065 18.3333 2.46673 18.1577 2.15417 17.8452C1.84161 17.5326 1.66602 17.1087 1.66602 16.6667V10.8333C1.66602 10.3913 1.84161 9.96738 2.15417 9.65482C2.46673 9.34226 2.89065 9.16667 3.33268 9.16667H5.83268"
														fill="#101010"
													/>
													<path
														d="M5.83268 18.3333H3.33268C2.89065 18.3333 2.46673 18.1577 2.15417 17.8452C1.84161 17.5326 1.66602 17.1087 1.66602 16.6667V10.8333C1.66602 10.3913 1.84161 9.96738 2.15417 9.65482C2.46673 9.34226 2.89065 9.16667 3.33268 9.16667H5.83268M11.666 7.5V4.16667C11.666 3.50363 11.4026 2.86774 10.9338 2.3989C10.4649 1.93006 9.82906 1.66667 9.16602 1.66667L5.83268 9.16667V18.3333H15.2327C15.6346 18.3379 16.0247 18.197 16.3309 17.9367C16.6372 17.6763 16.8391 17.3141 16.8993 16.9167L18.0493 9.41667C18.0856 9.1778 18.0695 8.9339 18.0021 8.70188C17.9348 8.46985 17.8178 8.25525 17.6592 8.07293C17.5007 7.89061 17.3044 7.74494 17.084 7.64602C16.8636 7.54709 16.6243 7.49727 16.3827 7.5H11.666Z"
														stroke="#101010"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											) : (
												<svg
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													onClick={handleSetLike}
												>
													<path
														d="M5.83317 18.3333H3.33317C2.89114 18.3333 2.46722 18.1577 2.15466 17.8452C1.8421 17.5326 1.6665 17.1087 1.6665 16.6667V10.8333C1.6665 10.3913 1.8421 9.96737 2.15466 9.65481C2.46722 9.34225 2.89114 9.16666 3.33317 9.16666H5.83317M11.6665 7.49999V4.16666C11.6665 3.50362 11.4031 2.86773 10.9343 2.39889C10.4654 1.93005 9.82954 1.66666 9.1665 1.66666L5.83317 9.16666V18.3333H15.2332C15.6351 18.3379 16.0252 18.197 16.3314 17.9367C16.6377 17.6763 16.8396 17.3141 16.8998 16.9167L18.0498 9.41666C18.0861 9.17779 18.07 8.93389 18.0026 8.70187C17.9353 8.46984 17.8183 8.25524 17.6597 8.07292C17.5012 7.8906 17.3049 7.74493 17.0845 7.646C16.8641 7.54708 16.6248 7.49725 16.3832 7.49999H11.6665Z"
														stroke="#101010"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											)}
											{
												<p className={styles.emotions}>
													{plan.data.likes}
												</p>
											}
										</div>
										<div className={styles.reaction}>
											{plan.data.disliked ? (
												<svg
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													onClick={handleDropDislike}
												>
													<path
														d="M8.33398 12.5V15.8333C8.33398 16.4964 8.59738 17.1323 9.06622 17.6011C9.53506 18.0699 10.1709 18.3333 10.834 18.3333L14.1673 10.8333V1.66667H4.76732C4.36538 1.66212 3.97534 1.803 3.66906 2.06333C3.36279 2.32366 3.16092 2.68591 3.10065 3.08333L1.95065 10.5833C1.91439 10.8222 1.93051 11.0661 1.99787 11.2981C2.06523 11.5301 2.18223 11.7448 2.34077 11.9271C2.49931 12.1094 2.69559 12.2551 2.91601 12.354C3.13643 12.4529 3.37573 12.5027 3.61732 12.5H8.33398ZM14.1673 1.66667H16.6673C17.1093 1.66667 17.5333 1.84226 17.8458 2.15482C18.1584 2.46738 18.334 2.89131 18.334 3.33333V9.16667C18.334 9.60869 18.1584 10.0326 17.8458 10.3452C17.5333 10.6577 17.1093 10.8333 16.6673 10.8333H14.1673"
														fill="#101010"
													/>
													<path
														d="M14.1673 1.66667H16.6673C17.1093 1.66667 17.5333 1.84226 17.8458 2.15482C18.1584 2.46738 18.334 2.89131 18.334 3.33333V9.16667C18.334 9.60869 18.1584 10.0326 17.8458 10.3452C17.5333 10.6577 17.1093 10.8333 16.6673 10.8333H14.1673M8.33398 12.5V15.8333C8.33398 16.4964 8.59738 17.1323 9.06622 17.6011C9.53506 18.0699 10.1709 18.3333 10.834 18.3333L14.1673 10.8333V1.66667H4.76732C4.36538 1.66212 3.97534 1.803 3.66906 2.06333C3.36279 2.32366 3.16092 2.68591 3.10065 3.08333L1.95065 10.5833C1.9144 10.8222 1.93051 11.0661 1.99787 11.2981C2.06523 11.5301 2.18223 11.7448 2.34077 11.9271C2.49931 12.1094 2.69559 12.2551 2.91601 12.354C3.13643 12.4529 3.37573 12.5027 3.61732 12.5H8.33398Z"
														stroke="#101010"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											) : (
												<svg
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													onClick={handleSetDislike}
												>
													<path
														d="M14.1668 1.66668H16.6668C17.1089 1.66668 17.5328 1.84227 17.8453 2.15483C18.1579 2.46739 18.3335 2.89132 18.3335 3.33334V9.16668C18.3335 9.6087 18.1579 10.0326 17.8453 10.3452C17.5328 10.6577 17.1089 10.8333 16.6668 10.8333H14.1668M8.3335 12.5V15.8333C8.3335 16.4964 8.59689 17.1323 9.06573 17.6011C9.53457 18.07 10.1705 18.3333 10.8335 18.3333L14.1668 10.8333V1.66668H4.76683C4.36489 1.66213 3.97485 1.80301 3.66857 2.06334C3.3623 2.32367 3.16043 2.68592 3.10016 3.08334L1.95016 10.5833C1.91391 10.8222 1.93002 11.0661 1.99738 11.2981C2.06474 11.5302 2.18174 11.7448 2.34028 11.9271C2.49882 12.1094 2.6951 12.2551 2.91552 12.354C3.13594 12.4529 3.37524 12.5027 3.61683 12.5H8.3335Z"
														stroke="#101010"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											)}
											{
												<p className={styles.emotions}>
													{plan.data.dislikes}
												</p>
											}
										</div>
									</div>
									<div
										className={[
											styles.textBlock,
											styles.textBlockDimensioned,
										].join(" ")}
									>
										<h2 className={styles.subTitle}>
											Basic information
										</h2>
										<p className={styles.text}>
											{plan.data.description}
										</p>
									</div>
									{plan.data.income.description && (
										<div className={styles.textBlock}>
											<h2 className={styles.subTitle}>
												What is the money spent on?
											</h2>
											<p className={styles.text}>
												{plan.data.income.description}
											</p>
										</div>
									)}
									{plan.data.expence.description && (
										<div className={styles.textBlock}>
											<h2 className={styles.subTitle}>
												How will the business make
												money?
											</h2>
											<p className={styles.text}>
												{plan.data.expence.description}
											</p>
										</div>
									)}
									<div className={styles.textBlock}>
										<h2 className={styles.subTitle}>
											Versions history (
											{plan?.editions?.length})
										</h2>
										<div className={styles.versionsWrapper}>
											<Select
												content={"Version from"}
												propsValues={plan?.editions}
												wantToDisplayId={activeEdition}
												onSelect={handleEditionsChange}
												style={{
													border: "1px solid #C2C2C2",
													width: "360px",
												}}
												bigSize
												sortByDate
											/>
											<div className={styles.castNewPlanEditionLook} >
												{plan.activeEdition !==
													activeEdition &&
													activeEdition !== null && (
														<Button
															text={"Cast a look"}
															onClick={
																handleReRenderEdition
															}
														/>
													)}
											</div>
										</div>
									</div>
									<div
										className={[
											styles.textBlock,
											styles.textBlockDimensioned,
										].join(" ")}
									>
										<h2 className={styles.subTitle}>
											Export data
										</h2>
										<div className={styles.exportDataWrapper}>
											<Button
												text={"Save in pdf"}
												onClick={() => window.print()}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className={styles.planWrapperMain}>
								<div className={styles.graphWrapper}>
									{IS_PROFITABLE ? (
										<div
											className={[
												styles.graphElem,
												styles.graphElemBig,
											].join(" ")}
										>
											<h2 className={styles.subTitle}>
												payback schedule, in $
											</h2>
											<div
												className={
													styles.grapghExplanationWrapper
												}
											>
												<div
													className={
														styles.grapghExplanationMain
													}
												>
													This business will pay off
													in {MONTHS} months
												</div>
												<div
													className={
														styles.grapghExplanationHint
													}
												>
													&nbsp;and will have an
													estimated income of{" "}
													{plan?.data?.income
														?.profit -
														(plan?.data?.expence
															?.salary +
															plan?.data?.expence
																?.electricity +
															plan?.data?.expence
																?.maintenance)}
													$
												</div>
											</div>
											<div
												className={styles.graphsWrapper}
											>
												<div
													className={
														styles.graphsWrapperGraphPart
													}
												>
													<Graph
														type="line"
														data={
															GRAPH_PAYBACK_DATA
														}
														options={
															GRAPH_PAYBACK_OPTIONS
														}
														style={{
															width: "100%",
														}}
													/>
												</div>
												<div
													className={
														styles.graphsWrapperLegendPart
													}
												>
													<div
														className={
															styles.legendElem
														}
													>
														<div
															className={
																styles.legendColor
															}
															style={{
																backgroundColor:
																	"#FF708B",
															}}
														></div>
														<div
															className={
																styles.legendText
															}
														>
															expences
														</div>
													</div>
													<div
														className={
															styles.legendElem
														}
													>
														<div
															className={
																styles.legendColor
															}
															style={{
																backgroundColor:
																	"#02F1E3",
															}}
														></div>
														<div
															className={
																styles.legendText
															}
														>
															incomings
														</div>
													</div>
												</div>
											</div>
										</div>
									) : (
										<div className={styles.graphElem}>
											<div
												className={
													styles.grapghExplanationWrapper
												}
											>
												<div
													className={
														styles.grapghExplanationMain
													}
												>
													This business will never pay
													off
												</div>
												<div
													className={
														styles.grapghExplanationHint
													}
												>
													&nbsp;and will eat{" "}
													{plan?.data?.income
														?.profit -
														(plan?.data?.expence
															?.salary +
															plan?.data?.expence
																?.electricity +
															plan?.data?.expence
																?.maintenance)}
													$ a month
												</div>
											</div>
											<p className={styles.graphSad}>
												:(
											</p>
										</div>
									)}
									<div
										className={[
											styles.graphElem,
											styles.graphElemSmall,
										].join(" ")}
									>
										<h2 className={styles.subTitle}>
											Spendings, in %
										</h2>
										{!IS_PROFITABLE ? (
											<h3 className={styles.chartHint}>
												Calculated for {12} months
											</h3>
										) : (
											<h3 className={styles.chartHint}>
												Calculated for {MONTHS} months
											</h3>
										)}
										<div className={styles.graphsWrapper}>
											<div
												className={
													styles.graphsWrapperGraphPart
												}
											>
												<Graph
													type="doughnut"
													data={GRAPH_SPENDINGS_DATA}
													options={
														GRAPH_SPENDINGS_OPTIONS
													}
													style={{ width: "100%" }}
												/>
											</div>
											<div
												className={
													styles.graphsWrapperLegendPart
												}
											>
												<div
													className={
														styles.graphLegendsWrapper
													}
												>
													{Object.keys(
														LEGEND_OPTIONS
													).map((e, i) => (
														<div
															key={i}
															className={
																styles.graphLegend
															}
														>
															<div
																className={
																	styles.legendElem
																}
															>
																<div
																	className={
																		styles.legendColor
																	}
																	style={{
																		backgroundColor:
																			LEGEND_OPTIONS[
																				e
																			]
																				.color,
																	}}
																></div>
																<div
																	className={
																		styles.legendText
																	}
																>
																	{e}:{" "}
																	{
																		LEGEND_OPTIONS[
																			e
																		].amount
																	}
																	$
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
						<section className={styles.darkSide}>
							<div className={styles.planWrapper}>
								<div className={styles.summaryWrapper}>
									<div className={styles.summaryBlock}>
										<h2
											className={[
												styles.subTitle,
												styles.light,
											].join(" ")}
										>
											Basic
										</h2>
										<div className={styles.summaryContent}>
											<SummaryStat
												header={"category"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															categories.content[
																plan.data
																	.category
															].name
														}
													</p>
												}
												style={{ width: "150px" }}
											/>
											<SummaryStat
												header={"type"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															types.content[
																plan.data.type
															].name
														}
													</p>
												}
												style={{ width: "150px" }}
											/>
											<SummaryStat
												header={"author"}
												content={
													<Link
														to={`/profile/${plan.activeOwner}/own`}
													>
														<div
															className={
																styles.summaryFlexWrapper
															}
														>
															<p
																className={
																	styles.summaryText
																}
															>
																{
																	plan.activeOwnerNickname
																}
															</p>
															<svg
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M14.166 14.1667V5.83337M14.166 5.83337H5.83268M14.166 5.83337L5.83268 14.1667"
																	stroke="white"
																	strokeLinecap="square"
																	strokeLinejoin="round"
																/>
															</svg>
														</div>
													</Link>
												}
												style={{ width: "150px" }}
											/>
										</div>
									</div>
									<div className={styles.summaryBlock}>
										<h2
											className={[
												styles.subTitle,
												styles.light,
											].join(" ")}
										>
											Spending
										</h2>
										<div className={styles.summaryContent}>
											<SummaryStat
												header={"salary, month"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															plan.data.expence
																.salary
														}
														$
													</p>
												}
												style={{ width: "150px" }}
											/>
											<SummaryStat
												header={"electricity, month"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															plan.data.expence
																.electricity
														}
														$
													</p>
												}
												style={{ width: "150px" }}
											/>
											<SummaryStat
												header={"amortization"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															plan.data.expence
																.amortization
														}
														$
													</p>
												}
												style={{ width: "150px" }}
											/>
											<SummaryStat
												header={"materials"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															plan.data.expence
																.materials
														}
														$
													</p>
												}
												style={{ width: "150px" }}
											/>
											<SummaryStat
												header={"maintenance, month"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															plan.data.expence
																.maintenance
														}
														$
													</p>
												}
												style={{ width: "150px" }}
											/>
										</div>
									</div>
									<div className={styles.summaryBlock}>
										<h2
											className={[
												styles.subTitle,
												styles.light,
											].join(" ")}
										>
											Incoming
										</h2>
										<div className={styles.summaryContent}>
											<SummaryStat
												header={"profit, month"}
												content={
													<p
														className={
															styles.summaryText
														}
													>
														{
															plan.data.income
																.profit
														}
														$
													</p>
												}
												style={{ width: "150px" }}
											/>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className={styles.commentsWrapper}>
							<div className={[styles.planWrapper].join(" ")}>
								<div className={styles.commentsBlockWrapper}>
									<h2 className={styles.subTitle}>
										Comments
									</h2>

									<div className={styles.commentsContent}>
										{plan.comments.content.map((e) => (
											<Comment
												key={e.id}
												author={e.author}
												text={e.text}
												created={e.created}
											/>
										))}
										<div>
											{!plan.comments.offset &&
												!plan.comments.isLoading &&
												plan.comments.needMore &&
												onNeedMoreComments(
													plan.activeBusiness,
													plan.activeEdition
												)}
											{plan.comments.needMore &&
											!plan.comments.isLoading ? (
												<div
													onClick={() => {
														onNeedMoreComments(
															plan.activeBusiness,
															plan.activeEdition
														);
													}}
												>
													<p
														className={
															styles.commentsEvent
														}
													>
														load more comments
													</p>
												</div>
											) : plan.comments.needMore ? (
												<p
													className={
														styles.commentsEvent
													}
												>
													COMMENTS LOADING
												</p>
											) : !plan.comments.content
													.length ? (
												<p
													className={
														styles.commentsEventHint
													}
												>
													Write first comment!
												</p>
											) : null}
										</div>
									</div>

									<div className={styles.commentsControls}>
										<div className={styles.commentsInput}>
											<Input
												id={"commentsInput"}
												label={"Write a comment..."}
												isEmpty={!comment.length}
												value={comment}
												onChange={handleCommentInput}
											/>
										</div>
										<div className={styles.commentsButton}>
											<Button
												text={
													<svg
														width="30"
														height="30"
														viewBox="0 0 30 30"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M8.74764 12.8082L9.29123 13.7595C9.63728 14.3651 9.81031 14.6679 9.81031 14.9999C9.81031 15.3318 9.63728 15.6346 9.29123 16.2402L8.74764 17.1915C7.19976 19.9003 6.42582 21.2547 7.02935 21.9263C7.63288 22.598 9.06202 21.9727 11.9203 20.7222L19.7648 17.2903C22.0092 16.3084 23.1314 15.8174 23.1314 14.9999C23.1314 14.1824 22.0092 13.6914 19.7648 12.7095L11.9203 9.27751C9.06202 8.02701 7.63288 7.40176 7.02935 8.07341C6.42582 8.74506 7.19976 10.0995 8.74764 12.8082Z"
															stroke="white"
															stroke-width="1.25"
														/>
													</svg>
												}
												onClick={handleCommentSubmit}
												style={{ height: "60px" }}
											/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</section>
				) : (
					<div>NO DATA</div>
				)
			) : (
				<div
					className={[
						styles.planWrapper,
						styles.animationWrapper,
					].join(" ")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={styles.loading}
						viewBox="0 0 100 100"
						preserveAspectRatio="xMidYMid"
					>
						<path
							fill="none"
							stroke="#8676FF"
							stroke-width="10"
							stroke-dasharray="177.0463604736328 79.54256774902345"
							d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
							stroke-linecap="round"
						>
							<animate
								attributeName="stroke-dashoffset"
								repeatCount="indefinite"
								dur="0.9174311926605504s"
								keyTimes="0;1"
								values="0;256.58892822265625"
							></animate>
						</path>
					</svg>
				</div>
			)}
		</section>
	);
};

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
	onNeedServerData: PropTypes.func,
	onPlanDeleted: PropTypes.func,
	onUserReact: PropTypes.func,
	planActions: PropTypes.object,
};

export default BusinessPlan;

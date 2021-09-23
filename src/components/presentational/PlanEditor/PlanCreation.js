import React from "react";
import styles from "./PlanEditor.module.css";
import Typed from "typed.js";
import { useEffect } from "react";
import { useRef } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const PlanCreation = ({ categories, types, onError, onSubmit }) => {
	let [state, setState] = useState({
		name: "",
		category: 0,
		type: 0,
		description: "",
		spendings: {
			salary: "",
			electricity: "",
			amortization: "",
			materials: "",
			maintenance: "",
			description: "",
		},
		incomings: {
			profit: "",
			description: "",
		},
	});

	function handleNameInput(e) {
		setState(Object.assign({}, state, { name: e.target.value }));
	}

	function handleCategorySelect(id) {
		setState(Object.assign({}, state, { category: id }));
	}

	function handleTypeSelect(id) {
		setState(Object.assign({}, state, { type: id }));
	}

	function handleDescriptionInput(e) {
		setState(Object.assign({}, state, { description: e.target.value }));
	}

	function handleSalaryInput(e) {
		setState(
			Object.assign({}, state, {
				spendings: Object.assign({}, state.spendings, {
					salary: e.target.value,
				}),
			})
		);
	}

	function handleElectricityInput(e) {
		setState(
			Object.assign({}, state, {
				spendings: Object.assign({}, state.spendings, {
					electricity: e.target.value,
				}),
			})
		);
	}

	function handleAmortizationInput(e) {
		setState(
			Object.assign({}, state, {
				spendings: Object.assign({}, state.spendings, {
					amortization: e.target.value,
				}),
			})
		);
	}

	function handleMaterialsInput(e) {
		setState(
			Object.assign({}, state, {
				spendings: Object.assign({}, state.spendings, {
					materials: e.target.value,
				}),
			})
		);
	}

	function handleMaintenanceInput(e) {
		setState(
			Object.assign({}, state, {
				spendings: Object.assign({}, state.spendings, {
					maintenance: e.target.value,
				}),
			})
		);
	}

	function handleSpendingsDescriptionInput(e) {
		setState(
			Object.assign({}, state, {
				spendings: Object.assign({}, state.spendings, {
					description: e.target.value,
				}),
			})
		);
	}

	function handleProfitInput(e) {
		setState(
			Object.assign({}, state, {
				incomings: Object.assign({}, state.incomings, {
					profit: e.target.value,
				}),
			})
		);
	}

	function handleIncomingsDescriptionInput(e) {
		setState(
			Object.assign({}, state, {
				incomings: Object.assign({}, state.incomings, {
					description: e.target.value,
				}),
			})
		);
	}

	const STEP_BASIC_INFORMATION = (
		<div>
			<h2 className={styles.subTitle}>Basic information</h2>

			<div className={styles.stepContentWrapper}>
				<div className={styles.stepContent}>
					<div className={styles.inputsWrapper}>
						<Input
							id={"projectName"}
							value={state.name}
							label={"Project name*"}
							isEmpty={!state.name.length}
							onChange={handleNameInput}
						/>
						<div className={styles.selectWrapper}>
							<Select
								content={"Category*"}
								propsValues={categories.content}
								onSelect={handleCategorySelect}
								bigSize
							/>
						</div>
						<div className={styles.selectWrapper}>
							<Select
								content={"Type*"}
								propsValues={types.content}
								onSelect={handleTypeSelect}
								bigSize
							/>
						</div>
					</div>
					<div className={styles.inputsWrapper}>
						<TextArea
							placeholder={"Project description"}
							onChange={handleDescriptionInput}
						/>
					</div>
				</div>
			</div>

			<div className={styles.stepControlsWrapper}>
				<div className={styles.stepPrev}>
					<p></p>
				</div>
				<div className={styles.stepNext}>
					<Button text={"Next step"} onClick={handleNextStep} />
				</div>
			</div>
		</div>
	);

	const STEP_SPENDINGS = (
		<div>
			<h2 className={styles.subTitle}>SPENDINGS</h2>

			<div className={styles.stepContentWrapper}>
				<div className={styles.stepContent}>
					<div className={styles.inputsWrapper}>
						<Input
							id={"projectSalary"}
							value={state.spendings.salary}
							label={"Salary, month*"}
							isEmpty={!state.spendings.salary.length}
							onChange={handleSalaryInput}
						/>
						<Input
							id={"projectElec"}
							value={state.spendings.electricity}
							label={"Electricity, month*"}
							isEmpty={!state.spendings.electricity.length}
							onChange={handleElectricityInput}
						/>
						<Input
							id={"projectAm"}
							value={state.spendings.amortization}
							label={"Amortization*"}
							isEmpty={!state.spendings.amortization.length}
							onChange={handleAmortizationInput}
						/>
						<div className={styles.inputsDelimeter}>
							<Input
								id={"projectMat"}
								value={state.spendings.materials}
								label={"Materials*"}
								isEmpty={!state.spendings.materials.length}
								onChange={handleMaterialsInput}
							/>
							<Input
								id={"projectMaintenance"}
								value={state.spendings.maintenance}
								label={"Maintenance*"}
								isEmpty={!state.spendings.maintenance.length}
								onChange={handleMaintenanceInput}
							/>
						</div>
					</div>
					<div className={styles.inputsWrapper}>
						<TextArea
							placeholder={"What is the money spent on?"}
							onChange={handleSpendingsDescriptionInput}
						/>
					</div>
				</div>
			</div>

			<div className={styles.stepControlsWrapper}>
				<div className={styles.stepPrev}>
					<p
						className={styles.stepPrevContent}
						onClick={handlePrevStep}
					>
						PREVIOS STEP
					</p>
				</div>
				<div className={styles.stepNext}>
					<Button text={"Next step"} onClick={handleNextStep} />
				</div>
			</div>
		</div>
	);

	const STEP_INCOMINGS = (
		<div>
			<h2 className={styles.subTitle}>Incomings</h2>

			<div className={styles.stepContentWrapper}>
				<div className={styles.stepContent}>
					<div className={styles.inputsWrapper}>
						<Input
							id={"projectInc"}
							value={state.incomings.profit}
							label={"Profit, month*"}
							isEmpty={!state.incomings.profit.length}
							onChange={handleProfitInput}
						/>
					</div>
					<div className={styles.inputsWrapper}>
						<Input
							id={"projectIncDesc"}
							value={state.incomings.description}
							label={"How will the business make the money?"}
							isEmpty={!state.incomings.description.length}
							onChange={handleIncomingsDescriptionInput}
						/>
					</div>
				</div>
			</div>

			<div className={styles.stepControlsWrapper}>
				<div className={styles.stepPrev}>
					<p
						className={styles.stepPrevContent}
						onClick={handlePrevStep}
					>
						PREVIOS STEP
					</p>
				</div>
				<div className={styles.stepNext}>
					<Button text={"Create plan"} onClick={handleSubmitClick} />
				</div>
			</div>
		</div>
	);

	const el = useRef(null);
	const typed = useRef(null);

	let [step, setStep] = useState(0);

	useEffect(() => {
		const options = {
			strings: [step === 0 ? `STEP A` : step === 1 ? "STEP B" : "STEP C"],
			typeSpeed: 50,
		};

		typed.current = new Typed(el.current, options);

		return () => {
			typed.current?.destroy();
		};
	}, [step]);

    function isNormalNumeric(n) {
        return !isNaN(n - parseFloat(n)) && parseInt(n, 10) >= 0 
    }

	function validateErrors() {
		if (
			!state.name ||
			!state.spendings.salary ||
			!state.spendings.electricity ||
			!state.spendings.amortization ||
			!state.spendings.materials ||
			!state.spendings.maintenance ||
			!state.incomings.profit
		)
			return "Enter all * values please!";

		if (
			!isNormalNumeric(state.spendings.salary) ||
			!isNormalNumeric(state.spendings.electricity) ||
			!isNormalNumeric(state.spendings.amortization) ||
			!isNormalNumeric(state.spendings.materials) ||
			!isNormalNumeric(state.spendings.maintenance) ||
			!isNormalNumeric(state.incomings.profit)
		)
			return "Please enter numbers > 0 in numeric inputs!";
	}

	function handlePrevStep() {
		setStep(step - 1);
	}

	function handleNextStep() {
		setStep(step + 1);
	}

	function handleSubmitClick() {
		if (validateErrors()) {
			onError(validateErrors());
			return;
		}
		onSubmit(state);
	}

	return (
		<section
			className={["sectionDimensioned", styles.planCreationWrapper].join(
				" "
			)}
		>
			<h1>
				CREATION: <span ref={el}></span>
			</h1>

			{console.log(
				"categories.content && types.content",
				categories.content && types.content,
				types.content,
				categories.content
			)}

			{categories.content.length && types.content.length ? (
				<div className={styles.creationContent}>
					<CSSTransition
						in={step === 0}
						timeout={500}
						classNames={"planStep"}
						unmountOnExit
					>
						{STEP_BASIC_INFORMATION}
					</CSSTransition>
					<CSSTransition
						in={step === 1}
						timeout={500}
						classNames={"planStep"}
						unmountOnExit
					>
						{STEP_SPENDINGS}
					</CSSTransition>
					<CSSTransition
						in={step === 2}
						timeout={500}
						classNames={"planStep"}
						unmountOnExit
					>
						{STEP_INCOMINGS}
					</CSSTransition>
				</div>
			) : (
				<p style={{ marginTop: "100px" }}>Initialize common data</p>
			)}
		</section>
	);
};

PlanCreation.propTypes = {
	categories: PropTypes.object,
	types: PropTypes.object,
	onSubmit: PropTypes.func,
	onError: PropTypes.func,
};

export default PlanCreation;

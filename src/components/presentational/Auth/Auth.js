import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styles from "./Auth.module.css";
import PropTypes from "prop-types";
import Client from "../../../Client/Client";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import SVGManager from "../../../svgs/svgs";

const Auth = ({
	location,
	isLoading,
	isLogged,
	onSignIn,
	onSignUp,
	onError,
}) => {
	useEffect(() => {
		return () => {
			Client.abortLoadAuthDataFetch();
		};
	}, []);

	const [state, setState] = useState({
		signIn: {
			login: "",
			loginError: "",
			pass: "",
			passError: "",
		},
		signUp: {
			login: "",
			loginError: "",
			nick: "",
			nickError: "",
			pass: "",
			passError: "",
			rePass: "",
			rePassError: "",
			agreement: false,
		},
	});

	const redirectPath = () => {
		const locationState = location.state;
		const pathname =
			locationState && locationState.from && locationState.from.pathname;
		return pathname || "/profile";
	};

	function validate(action, value) {
		switch (action) {
			case "signUpRePassword": {
				if (state.signUp.pass !== value) return "Not even close";
				if (!value) return "Enter value";
				if (value.length >= 64) return "Need < 64 symbols";
				return "";
			}

			case "signInLogin":
			case "signInPassword":
			case "signUpLogin":
			case "signUpPassword":
			case "signUpRePassword": {
				if (!value) return "Enter value";
				if (value.length >= 64) return "Need < 64 symbols";
				return "";
			}

			case "signUpNickname": {
				if (!value) return "Enter value";
				if (value.length >= 32) return "Need < 32 symbols";
				return "";
			}

			case "signIn": {
				return state.signIn.loginError ||
					state.signIn.passError ||
					!state.signIn.login ||
					!state.signIn.pass
					? "Need to correct fields!"
					: "";
			}

			case "signUp": {
				if (!state.signUp.agreement) return "Please, accept the terms!";
				return state.signUp.loginError ||
					state.signUp.nickError ||
					state.signUp.passError ||
					state.signUp.rePassError ||
					!state.signUp.login ||
					!state.signUp.nick ||
					!state.signUp.pass ||
					!state.signUp.rePass
					? "Need to correct fields!"
					: "";
			}
		}
	}

	function handleSignInLoginChange(e) {
		setState(
			Object.assign({}, state, {
				signIn: Object.assign({}, state.signIn, {
					login: e.target.value,
					loginError: validate("signInLogin", e.target.value),
				}),
			})
		);
	}

	function handleSignInPasswordChange(e) {
		setState(
			Object.assign({}, state, {
				signIn: Object.assign({}, state.signIn, {
					pass: e.target.value,
					passError: validate("signInPassword", e.target.value),
				}),
			})
		);
	}

	function handleSignUpLoginChange(e) {
		setState(
			Object.assign({}, state, {
				signUp: Object.assign({}, state.signUp, {
					login: e.target.value,
					loginError: validate("signUpLogin", e.target.value),
				}),
			})
		);
	}

	function handleSignUpNicknameChange(e) {
		setState(
			Object.assign({}, state, {
				signUp: Object.assign({}, state.signUp, {
					nick: e.target.value,
					nickError: validate("signUpNickname", e.target.value),
				}),
			})
		);
	}

	function handleSignUpPasswordChange(e) {
		setState(
			Object.assign({}, state, {
				signUp: Object.assign({}, state.signUp, {
					pass: e.target.value,
					passError: validate("signUpPassword", e.target.value),
				}),
			})
		);
	}

	function handleSignUpRePasswordChange(e) {
		setState(
			Object.assign({}, state, {
				signUp: Object.assign({}, state.signUp, {
					rePass: e.target.value,
					rePassError: validate("signUpRePassword", e.target.value),
				}),
			})
		);
	}

	function handleAgreementClick() {
		setState(
			Object.assign({}, state, {
				signUp: Object.assign({}, state.signUp, {
					agreement: !state.signUp.agreement,
				}),
			})
		);
	}

	function handleSignInTry() {
		let notValid = validate("signIn");
		!notValid ? onSignIn(state.signIn) : onError(notValid);
	}

	function handleSignUpTry() {
		let notValid = validate("signUp");
		!notValid ? onSignUp(state.signUp) : onError(notValid);
	}

	let [activeAction, setActiveAction] = useState("signIn");

	function handleActiveAction(action) {
		return () => setActiveAction(action);
	}

	return (
		<section
			className={["sectionDimensioned", styles.authWrapper].join(" ")}
		>
			{isLogged ? <Redirect to={redirectPath()} /> : null}
			<h1>
				<span
					className={[
						styles.authAction,
						activeAction === "signIn" && styles.activeAuthAction,
					].join(" ")}
				>
					SIGN IN
				</span>
				{" & "}
				<span
					className={[
						styles.authAction,
						activeAction === "signUp" && styles.activeAuthAction,
					].join(" ")}
				>
					CREATE ACCOUNT
				</span>
			</h1>
			<p className={styles.authHint}>
				We will redirect you to your target just in
				<br />a moment, introduce yourself please
			</p>
			<div className={styles.inputsBlock}>
				<div className={styles.inputsWrapper}>
					{isLoading && (
						<div className={"userActionLocker"}>
							{SVGManager.getSvg("lockerSvg")}
						</div>
					)}
					<Input
						id={"signInlogin"}
						error={state.signIn.loginError}
						label={"Login/Email"}
						isEmpty={!state.signIn.login}
						onChange={handleSignInLoginChange}
						onFocus={handleActiveAction("signIn")}
					/>
					<Input
						id={"signInPassword"}
						error={state.signIn.passError}
						label={"Password"}
						isEmpty={!state.signIn.pass}
						onChange={handleSignInPasswordChange}
						onFocus={handleActiveAction("signIn")}
						password
					/>
					<Button
						text={"Sign in"}
						onClick={handleSignInTry}
						style={{ marginTop: "15px" }}
					/>
				</div>
				<div className={styles.inputsWrapper}>
					{isLoading && (
						<div className={"userActionLocker"}>
							{SVGManager.getSvg("lockerSvg")}
						</div>
					)}
					<Input
						id={"signUplogin"}
						error={state.signUp.loginError}
						label={"Login/Email"}
						isEmpty={!state.signUp.login}
						onChange={handleSignUpLoginChange}
						onFocus={handleActiveAction("signUp")}
					/>
					<Input
						id={"signUpNickname"}
						error={state.signUp.nickError}
						label={"Nickname"}
						isEmpty={!state.signUp.nick}
						onChange={handleSignUpNicknameChange}
						onFocus={handleActiveAction("signUp")}
					/>
					<Input
						id={"signUpPassword"}
						error={state.signUp.passError}
						label={"Password"}
						isEmpty={!state.signUp.pass}
						onChange={handleSignUpPasswordChange}
						onFocus={handleActiveAction("signUp")}
						password
					/>
					<Input
						id={"signUpRePassword"}
						error={state.signUp.rePassError}
						label={"Repeat password"}
						isEmpty={!state.signUp.rePass}
						onChange={handleSignUpRePasswordChange}
						onFocus={handleActiveAction("signUp")}
						password
					/>
					<div className={styles.agreementWrapper} >
						<input
							type="checkbox"
							id="checkbox"
							checked={state.signUp.agreement}
							onChange={handleAgreementClick}
						/>
						<label
							style={{ marginLeft: "10px" }}
							htmlFor="checkbox"
						>
							I agree{" "}
							<Link
								className={styles.agreementLink}
								to={"/terms"}
							>
								Terms & conditions
							</Link>
						</label>
					</div>
					<Button text={"Create account"} onClick={handleSignUpTry} />
				</div>
			</div>
		</section>
	);
};

Auth.propTypes = {
	location: PropTypes.object,
	isLoading: PropTypes.bool.isRequired,
	isLogged: PropTypes.bool.isRequired,
	onSignIn: PropTypes.func.isRequired,
	onSignUp: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired,
};

export default Auth;

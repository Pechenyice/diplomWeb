import React, { useEffect, useState, useRef } from "react";
import styles from "./Profile.module.css";
import PropTypes from "prop-types";
import Client from "../../../Client/Client";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { NavLink, Redirect, Switch, Route, Link } from "react-router-dom";
import InvalidRoute from "../404/404";
import BusinessCard from "../BusinessCard/BusinessCard";
import Typed from "typed.js";
import { CSSTransition } from "react-transition-group";
import SVGManager from "../../../svgs/svgs";

const Profile = ({
	userId,
	businessman,
	login,
	nickname,
	userDataIsLoading,
	cachedForUser,
	profilePlans,
	types,
	categories,
	onNeedUserNickname,
	onNeedLoadOwnPlans,
	onNeedLoadLikedPlans,
	onNeedLoadDislikedPlans,
	onSaveProfileData,
	onSaveProfilePassword,
	onNeedCategories,
	onNeedTypes,
	onLogout,
	onError,
	onClear,
	location,
	profileUpdateData = null,
}) => {
	const el = useRef(null);
	const typed = useRef(null);

	useEffect(() => {
		if (!categories.content.length && !categories.isLoading)
			onNeedCategories();
		if (!types.content.length && !types.isLoading) onNeedTypes();

		if (nickname === null) onNeedUserNickname();

		const options = {
			strings:
				businessman === userId
					? [`Welcome home, ${nickname} `]
					: [`Welcome to ${nickname}'s home`],
			typeSpeed: 50,
		};

		if (nickname !== null) typed.current = new Typed(el.current, options);

		return () => {
			typed.current?.destroy();
			// onClear();
			// Client.abortLoadOwnPlansFetch();
			// Client.abortLoadLikedPlansFetch();
			// Client.abortLoadDislikedPlansFetch();
		};
	}, [nickname]);

	useEffect(() => (() => onClear()), []);

	const [state, setState] = useState({
		data: {
			login: login || "",
			nick: nickname || "",
		},
		pass: {
			oldPass: "",
			pass: "",
			rePass: "",
		},
	});

	const [showPlans, setShowPlans] = useState(false);
	useEffect(() => {
		if (
			cachedForUser !== userId &&
			!profilePlans.own.isFetched &&
			!profilePlans.own.isLoading
		)
			onNeedLoadOwnPlans();
		if (
			cachedForUser !== userId &&
			!profilePlans.liked.isFetched &&
			!profilePlans.liked.isLoading
		)
			onNeedLoadLikedPlans();
		if (
			cachedForUser !== userId &&
			!profilePlans.disliked.isFetched &&
			!profilePlans.disliked.isLoading
		)
			onNeedLoadDislikedPlans();
			
		if (
			profilePlans.own.content?.length ||
			profilePlans.liked.content?.length ||
			profilePlans.disliked.content?.length
		)
			setTimeout(() => {
				setShowPlans(true);
			}, 20);
	}, [profilePlans]);

	// function handleDataLoginChange(e) {
	// 	setState(
	// 		Object.assign({}, state, {
	// 			data: Object.assign({}, state.data, { login: e.target.value }),
	// 		})
	// 	);
	// }

	function handleDataNicknameChange(e) {
		setState(
			Object.assign({}, state, {
				data: Object.assign({}, state.data, { nick: e.target.value }),
			})
		);
	}

	function handleOldPassPasswordChange(e) {
		setState(
			Object.assign({}, state, {
				pass: Object.assign({}, state.pass, {
					oldPass: e.target.value,
				}),
			})
		);
	}

	function handlePassPasswordChange(e) {
		setState(
			Object.assign({}, state, {
				pass: Object.assign({}, state.pass, { pass: e.target.value }),
			})
		);
	}

	function handlePassRePasswordChange(e) {
		setState(
			Object.assign({}, state, {
				pass: Object.assign({}, state.pass, { rePass: e.target.value }),
			})
		);
	}

	function validate(action, value) {
		switch (action) {
			case "profileData": {
				if (!value) {
					onError("Cannot save empty nickname!");
					return false;
				}
				if (nickname === value) {
					onError("Cannot save the same nickname!");
					return false;
				}
				if (value.length >= 32) {
					onError(
						"Cannot save such a long nickname, need < 32 symbols!"
					);
					return false;
				}
				return true;
			}

			case "profilePassword": {
				if (
					!state.pass.oldPass ||
					!state.pass.pass ||
					!state.pass.rePass
				) {
					onError("Cannot use empty passwords!");
					return false;
				}
				if (state.pass.pass === state.pass.oldPass) {
					onError("New password should not be the same!");
					return false;
				}
				if (state.pass.pass !== state.pass.rePass) {
					onError("New passwords are not equal!");
					return false;
				}
				if (
					state.pass.pass.length >= 64 ||
					state.pass.rePass.length >= 64 ||
					state.pass.oldPass.length >= 64
				) {
					onError(
						"Cannot use such a long password, need < 64 symbols!"
					);
					return false;
				}
				return true;
			}
		}
	}

	function handleSaveProfileData() {
		if (validate("profileData", state.data.nick)) {
			onSaveProfileData(state.data.nick);
		}
	}

	function handleSaveProfilePassword() {
		if (validate("profilePassword")) {
			onSaveProfilePassword(
				state.pass.oldPass,
				state.pass.pass,
				state.pass.rePass
			);
			setState(
				Object.assign({}, state, {
					pass: Object.assign({}, state.pass, {
						oldPass: "",
						pass: "",
						rePass: "",
					}),
				})
			);
		}
	}

	return (
		<section
			className={[
				"sectionDimensioned",
				styles.profileWrapperDark,
				styles.profileWrapperMain,
			].join(" ")}
		>
			{profileUpdateData?.logoutInProcess && (
				<div className={"userActionLocker"}>
					{SVGManager.getSvg("lockerSvg")}
				</div>
			)}
			<section className={styles.profileWrapperLight}>
				<section className={styles.profileWrapper}>
					{/* {login}
			{!userDataIsLoading ? (nickname ? nickname : "NO DATA") : "LOADING"} */}
					{location.pathname
						.split("/profile")[1]
						.includes(businessman) ? (
						<Redirect to={"/profile/own"} />
					) : null}
					{location.pathname.split("/profile")[1] === "" ||
					location.pathname.split("/profile")[1] === "/" ? (
						<Redirect
							to={`${location.pathname}/own`.replace(/\/\//, "/")}
						/>
					) : null}

					<div className={styles.profileDataWrapperTop}>
						<h1 className={styles.profileMainText}>PROFILE</h1>
						<div
							className={[
								styles.profileDataInfo,
								businessman !== userId &&
									styles.profileDataLongInfo,
							].join(" ")}
						>
							<div className={styles.profileDummy}></div>
							<div style={{ display: "flex" }}>
								<p className={styles.typed} ref={el}></p>
							</div>
						</div>
					</div>
					{businessman === userId && (
						<div className={styles.profileDataWrapper}>
							<div className={styles.inputsWrapper}>
								<h2 className={styles.subTitle}>
									Edit profile
								</h2>
								{profileUpdateData?.nicknameIsLoading && (
									<div className={"userActionLocker"}>
										{SVGManager.getSvg("lockerSvg")}
									</div>
								)}
								<Input
									id={"datalogin"}
									label={"Login/Email"}
									isEmpty={!state.data.login}
									value={state.data.login}
									onChange={() => {}}
									readonly
								/>
								<Input
									id={"dataNickname"}
									label={"Nickname"}
									isEmpty={!state.data.nick}
									value={state.data.nick}
									onChange={handleDataNicknameChange}
								/>
								<Button
									text={"Apply changes"}
									onClick={handleSaveProfileData}
									className={styles.profileButton}
								/>
							</div>
							<div className={styles.inputsWrapper}>
								<h2 className={styles.subTitle}>
									Change password
								</h2>
								{profileUpdateData?.passwordIsLoading && (
									<div className={"userActionLocker"}>
										{SVGManager.getSvg("lockerSvg")}
									</div>
								)}
								<Input
									id={"oldPassPass"}
									label={"Old password"}
									isEmpty={!state.pass.oldPass}
									value={state.pass.oldPass}
									onChange={handleOldPassPasswordChange}
									password
								/>
								<Input
									id={"passPass"}
									label={"New password"}
									isEmpty={!state.pass.pass}
									value={state.pass.pass}
									onChange={handlePassPasswordChange}
									password
								/>
								<Input
									id={"passRePass"}
									label={"Repeat password"}
									isEmpty={!state.pass.rePass}
									value={state.pass.rePass}
									onChange={handlePassRePasswordChange}
									password
								/>
								<Button
									text={"Change password"}
									onClick={handleSaveProfilePassword}
									className={styles.profileButton}
								/>
							</div>
							<div className={styles.inputsWrapper}>
								<h2 className={styles.subTitle}>
									Manage profile
								</h2>
								<Button text={"Logout"} onClick={onLogout} className={styles.profileButton} />
							</div>
						</div>
					)}
				</section>
			</section>
			<section
				className={[
					styles.profileWrapperDark,
					businessman !== userId && styles.profileWrapperFixer,
				].join(" ")}
			>
				<section
					className={[
						styles.profileWrapper,
						styles.profileWrapperLast,
					].join(" ")}
				>
					<div className={styles.plansMainWrapper}>
						<div className={styles.plansPartitionsWrapper}>
							<NavLink
								to={`${
									location.pathname
										.split("/own")[0]
										.split("/liked")[0]
										.split("/disliked")[0]
								}/own`.replace(/\/\//, "/")}
								className={styles.profileLink}
								activeClassName={styles.activeProfileLink}
							>
								Own plans &nbsp;
								<span className={styles.profileLinkCount}>
									{" "}
									({profilePlans?.own?.content?.length || 0})
								</span>
							</NavLink>
							<NavLink
								to={`${
									location.pathname
										.split("/own")[0]
										.split("/liked")[0]
										.split("/disliked")[0]
								}/liked`.replace(/\/\//, "/")}
								className={styles.profileLink}
								activeClassName={styles.activeProfileLink}
							>
								Favorites &nbsp;
								<span className={styles.profileLinkCount}>
									{" "}
									({profilePlans?.liked?.content?.length || 0}
									)
								</span>
							</NavLink>
							<NavLink
								to={`${
									location.pathname
										.split("/own")[0]
										.split("/liked")[0]
										.split("/disliked")[0]
								}/disliked`.replace(/\/\//, "/")}
								className={styles.profileLink}
								activeClassName={styles.activeProfileLink}
							>
								Trash &nbsp;
								<span className={styles.profileLinkCount}>
									{" "}
									(
									{profilePlans?.disliked?.content?.length ||
										0}
									)
								</span>
							</NavLink>
						</div>
						{
							businessman === userId && <Link
								to={"/newPlan"}
								className={styles.plansCreateButton}
							>
								<Button
									theme={"dark"}
									text={"Create a business plan"}
								/>
							</Link>
						}
					</div>
					<Switch>
						<Route
							path={
								`${location.pathname}`.split("/profile")[0] +
								`/profile${
									`${location.pathname}`
										.split("/profile")[1]
										.split("/own")[0]
										.split("/liked")[0]
										.split("/disliked")[0]
								}/own`
							}
							render={() => (
								<div className={styles.plansWrapper}>
									{profilePlans.own.isLoading ? (
										<p className={styles.plansHint}>
											Loading own plans...
										</p>
									) : profilePlans.own.content.length &&
									  categories.content.length &&
									  types.content.length ? (
										profilePlans.own.content.map((e) => (
											<CSSTransition
												in={showPlans}
												timeout={500}
												classNames="planAnimation"
												key={e.id}
												unmountOnExit
											>
												<BusinessCard
													theme={"dark"}
													data={e}
													categories={categories}
													types={types}
												/>
											</CSSTransition>
										))
									) : (
										<p className={styles.plansHint}>
											You have no own plans :(
										</p>
									)}
								</div>
							)}
						/>
						<Route
							path={
								`${location.pathname}`.split("/profile")[0] +
								`/profile${
									`${location.pathname}`
										.split("/profile")[1]
										.split("/own")[0]
										.split("/liked")[0]
										.split("/disliked")[0]
								}/liked`
							}
							render={() => (
								<div className={styles.plansWrapper}>
									{profilePlans.liked.isLoading ? (
										<p className={styles.plansHint}>
											Loading liked plans...
										</p>
									) : profilePlans.liked.content.length &&
									  categories.content.length &&
									  types.content.length ? (
										profilePlans.liked.content.map((e) => (
											<CSSTransition
												in={showPlans}
												timeout={500}
												classNames="planAnimation"
												key={e.id}
												unmountOnExit
											>
												<BusinessCard
													theme={"dark"}
													data={e}
													key={e.id}
													categories={categories}
													types={types}
												/>
											</CSSTransition>
										))
									) : (
										<p className={styles.plansHint}>
											You have no liked plans :(
										</p>
									)}
								</div>
							)}
						/>
						<Route
							path={
								`${location.pathname}`.split("/profile")[0] +
								`/profile${
									`${location.pathname}`
										.split("/profile")[1]
										.split("/own")[0]
										.split("/liked")[0]
										.split("/disliked")[0]
								}/disliked`
							}
							render={() => (
								<div className={styles.plansWrapper}>
									{profilePlans.disliked.isLoading ? (
										<p className={styles.plansHint}>
											Loading diliked plans...
										</p>
									) : profilePlans.disliked.content.length &&
									  categories.content.length &&
									  types.content.length ? (
										profilePlans.disliked.content.map(
											(e) => (
												<CSSTransition
													in={showPlans}
													timeout={500}
													classNames="planAnimation"
													key={e.id}
													unmountOnExit
												>
													<BusinessCard
														theme={"dark"}
														data={e}
														key={e.id}
														categories={categories}
														types={types}
													/>
												</CSSTransition>
											)
										)
									) : (
										<p className={styles.plansHint}>
											You have no disliked plans :(
										</p>
									)}
								</div>
							)}
						/>
						<Route component={InvalidRoute} />
					</Switch>
				</section>
			</section>
		</section>
	);
};

Profile.propTypes = {
	userId: PropTypes.string,
	businessman: PropTypes.string,
	login: PropTypes.any,
	nickname: PropTypes.any,
	userDataIsLoading: PropTypes.bool,
	profilePlans: PropTypes.object,
	types: PropTypes.object,
	categories: PropTypes.object,
	onNeedLoadOwnPlans: PropTypes.func,
	onNeedLoadLikedPlans: PropTypes.func,
	onNeedLoadDislikedPlans: PropTypes.func,
	onNeedUserNickname: PropTypes.func,
	onNeedCategories: PropTypes.func,
	onNeedTypes: PropTypes.func,
	onSaveProfileData: PropTypes.func,
	onSaveProfilePassword: PropTypes.func,
	onLogout: PropTypes.func,
	onError: PropTypes.func,
	onClear: PropTypes.func,
	location: PropTypes.object,
	profileUpdateData: PropTypes.any,
};

export default Profile;

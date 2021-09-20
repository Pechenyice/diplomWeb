import React, { useEffect, useState, useRef } from "react";
import styles from "./Profile.module.css";
import PropTypes from "prop-types";
import Client from "../../../Client/Client";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { NavLink, Redirect, Switch, Route } from "react-router-dom";
import InvalidRoute from "../404/404";
import BusinessCard from "../BusinessCard/BusinessCard";
import Typed from "typed.js";

const Profile = ({
	userId,
	businessman,
	login,
	nickname,
	userDataIsLoading,
	cachedForUser,
	profilePlans,
	onNeedUserNickname,
	onNeedLoadOwnPlans,
	onNeedLoadLikedPlans,
	onNeedLoadDislikedPlans,
	location,
}) => {
	const el = useRef(null);
	const typed = useRef(null);

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

		if (nickname == null) onNeedUserNickname();

		const options = {
			strings: [`Welcome home, ${nickname} `],
			typeSpeed: 50,
		};

		typed.current = new Typed(el.current, options);

		return () => {
			typed.current.destroy();
			// Client.abortLoadOwnPlansFetch();
			// Client.abortLoadLikedPlansFetch();
			// Client.abortLoadDislikedPlansFetch();
		};
	}, []);

	console.log(login, nickname)

	const [state, setState] = useState({
		data: {
			login: login || "",
			nick: nickname || "",
		},
		pass: {
			oldPass: '',
			pass: "",
			rePass: "",
		},
	});

	function handleDataLoginChange(e) {
		setState(
			Object.assign({}, state, {
				data: Object.assign({}, state.data, { login: e.target.value }),
			})
		);
	}

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
				pass: Object.assign({}, state.pass, { oldPass: e.target.value }),
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

	return (
		<section className={styles.profileWrapper}>
			{/* {login}
			{!userDataIsLoading ? (nickname ? nickname : "NO DATA") : "LOADING"} */}
			{location.pathname.split("/profile")[1].includes(businessman) ? (
				<Redirect to={"/profile/own"} />
			) : null}
			{location.pathname.split("/profile")[1] === "" ||
			location.pathname.split("/profile")[1] === "/" ? (
				<Redirect
					to={`${location.pathname}/own`.replace(/\/\//, "/")}
				/>
			) : null}
			<h1>PROFILE</h1>
			<div style={{display: "flex"}}><p className={styles.typed} ref={el}></p></div>
			<div className={styles.profileDataWrapper}>
				<div className={styles.profileDummy}></div>
				<div className={styles.inputsWrapper}>
					<h2 className={styles.subTitle}>Edit profile</h2>
					<Input
						id={"datalogin"}
						label={"Login/Email"}
						isEmpty={!state.data.login}
						value={state.data.login}
						onChange={handleDataLoginChange}
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
						onClick={() => {}}
						style={{ marginTop: "15px" }}
					/>
				</div>
				<div className={styles.inputsWrapper}>
				<h2 className={styles.subTitle}>Change password</h2>
				<Input
						id={"oldPassPass"}
						label={"Old password"}
						isEmpty={!state.pass.oldPass}
						onChange={handleOldPassPasswordChange}
					/>
					<Input
						id={"passPass"}
						label={"New password"}
						isEmpty={!state.pass.pass}
						onChange={handlePassPasswordChange}
					/>
					<Input
						id={"passRePass"}
						label={"Repeat password"}
						isEmpty={!state.pass.rePass}
						onChange={handlePassRePasswordChange}
					/>
					<Button
						text={"Change password"}
						onClick={() => {}}
						style={{ marginTop: "15px" }}
					/>
				</div>
			</div>
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
						({profilePlans?.liked?.content?.length || 0})
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
						({profilePlans?.disliked?.content?.length || 0})
					</span>
				</NavLink>
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
							{profilePlans.own.isLoading
								? "LOADING OWN PLANS"
								: profilePlans.own.content.length
								? profilePlans.own.content.map((e) => (
										<BusinessCard data={e} key={e.id} />
								  ))
								: "NO OWN DATA"}
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
							{profilePlans.liked.isLoading
								? "LOADING LIKED PLANS"
								: profilePlans.liked.content.length
								? profilePlans.liked.content.map((e) => (
										<BusinessCard data={e} key={e.id} />
								  ))
								: "NO LIKED DATA"}
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
							{profilePlans.disliked.isLoading
								? "LOADING DISLIKED PLANS"
								: profilePlans.disliked.content.length
								? profilePlans.disliked.content.map((e) => (
										<BusinessCard data={e} key={e.id} />
								  ))
								: "NO DISLIKED DATA"}
						</div>
					)}
				/>
				<Route component={InvalidRoute} />
			</Switch>
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
	onNeedLoadOwnPlans: PropTypes.func,
	onNeedLoadLikedPlans: PropTypes.func,
	onNeedLoadDislikedPlans: PropTypes.func,
	onNeedUserNickname: PropTypes.func,
	location: PropTypes.object,
};

export default Profile;

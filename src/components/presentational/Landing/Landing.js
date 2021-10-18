import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import Button from "./../Button/Button";
import SVGManager from "../../../svgs/svgs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Landing = () => {
	let [activeAction, setActiveAction] = useState("");

	useState(() => {
		setActiveAction("boss");
	}, []);

	function handleSwapMap(action) {
		return () => {
			setActiveAction(action);
		};
	}

	return (
		<section className={["sectionDimensioned", styles.landing].join(" ")}>
			<div className={styles.landingWrapper}>
				<h1 className={styles.landingMain}>
					Business area
					<br /> <span className={styles.mainNotMain}>for</span>{" "}
					business idea
					<div className={styles.mainDecorator}>
						{SVGManager.getSvg("landingMainDecoration")}
					</div>
				</h1>
				<div className={styles.buttonsWrapper}>
					<Link to={"/catalog"} className={styles.landingLink}>
						<Button onClick={() => {}} text={"To catalog"} />
					</Link>
					<Link to={"/profile/own"} className={styles.landingLink}>
						<Button onClick={() => {}} text={"Become a member"} />
					</Link>
				</div>
			</div>
			<div className={styles.landingWrapper}>
				<div className={styles.landingIconsWrapper}>
					<div className={styles.landingIconContent}>
						{SVGManager.getSvg("landingWork")}
						<p className={styles.landingIconText}>
							Tired of working for «uncle»?
						</p>
					</div>
					<div className={styles.svgArrow}>{SVGManager.getSvg("landingArrow")}</div>
					<div className={styles.landingIconContent}>
						{SVGManager.getSvg("landingBusiness")}
						<p
							className={[
								styles.landingIconText,
								styles.landingIconBigText,
							].join(" ")}
						>
							Start your own business with the BUSINASS community!
						</p>
					</div>
				</div>
			</div>
			<div
				className={[
					styles.landingWrapper,
					styles.landingExplanation,
				].join(" ")}
			>
				<h1 className={styles.explanationMain}>
					WHY WAS BUSINASS CREATED?
				</h1>
				<div className={styles.mapPointer}>
					<h2 className={[styles.subTitle, styles.explanationSubTitle].join(' ')}>
						Choose scenario and follow the map
					</h2>
					<svg
						width="22"
						height="23"
						viewBox="0 0 22 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.17578 11.0015L20.9701 11.347"
							stroke="#101010"
							strokeWidth="1.15816"
							strokeLinecap="square"
							strokeLinejoin="round"
						/>
						<path
							d="M11.4467 1.17931L21.1694 11.3505L11.0977 21.1763"
							stroke="#101010"
							strokeWidth="1.15816"
							strokeLinecap="square"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className={styles.explanationWrapper}>
					<div
						className={[
							styles.explanationTextWrapper,
							activeAction === "boss" &&
								styles.explanationTextWrapperActive,
						].join(" ")}
						onClick={handleSwapMap("boss")}
					>
						<h2 className={[styles.subTitle, styles.explanationSwapSubTitle].join(' ')}>For businessmen</h2>
						<p className={styles.explanationText}>
							Сan choose existed business plan and not
							investigating a bicycle, moreover he can read
							community feedback
						</p>
					</div>
					<div
						className={[
							styles.explanationTextWrapper,
							activeAction === "creator" &&
								styles.explanationTextWrapperActive,
						].join(" ")}
						onClick={handleSwapMap("creator")}
					>
						<h2 className={[styles.subTitle, styles.explanationSwapSubTitle].join(' ')}>For creators</h2>
						<p className={styles.explanationText}>
							Can advertise own existing business or franchise, or
							share his business ideas with a wide range of people
						</p>
					</div>
				</div>
			</div>
			<div className={styles.landingDark}>
				<div className={styles.landingWrapper}>
					<h1 className={styles.mapsHeading}>
						<span
							className={[
								styles.landingAction,
								activeAction === "boss" &&
									styles.landingActiveAction,
							].join(" ")}
						>
							BECOME A BOSS
						</span>
						{" & "}
						<span
							className={[
								styles.landingAction,
								activeAction === "creator" &&
									styles.landingActiveAction,
							].join(" ")}
						>
							BECOME A CREATOR
						</span>
					</h1>
					<div className={styles.mapWrapper}>
						<CSSTransition
							in={activeAction === "boss"}
							classNames="mapAnimation"
							timeout={500}
							unmountOnExit
						>
							<div>
								<div className={[styles.mapContainer, styles.mapContainerBig].join(' ')}>
									{SVGManager.getSvg("landingBossMap")}
								</div>
								<div className={[styles.mapContainer, styles.mapContainerMiddle].join(' ')}>
									{SVGManager.getSvg("landingBossMapMiddle")}
								</div>
								<div className={[styles.mapContainer, styles.mapContainerLittle].join(' ')}>
									{SVGManager.getSvg("landingBossMapLittle")}
								</div>
								<p
									className={[
										styles.mapText,
										styles.bossFirst,
									].join(" ")}
								>
									look at business
								</p>
								<p
									className={[
										styles.mapText,
										styles.bossSecond,
									].join(" ")}
								>
									comment and react business
								</p>
								<p
									className={[
										styles.mapText,
										styles.bossThird,
									].join(" ")}
								>
									export data of favorite businesses
								</p>
								<p
									className={[
										styles.mapText,
										styles.bossFourth,
									].join(" ")}
								>
									you are almost millionaire
								</p>
							</div>
						</CSSTransition>
						<CSSTransition
							in={activeAction === "creator"}
							classNames="mapAnimation"
							timeout={500}
							unmountOnExit
						>
							<div>
								<div className={[styles.mapContainer, styles.mapContainerBig].join(' ')}>
									{SVGManager.getSvg("landingCreatorMap")}
								</div>
								<div className={[styles.mapContainer, styles.mapContainerLittle].join(' ')}>
									{SVGManager.getSvg("landingCreatorMapLittle")}
								</div>
								<div className={[styles.mapContainer, styles.mapContainerMiddle].join(' ')}>
									{SVGManager.getSvg("landingCreatorMapMiddle")}
								</div>
								<p
									className={[
										styles.mapText,
										styles.creatorFirst,
									].join(" ")}
								>
									create your business
								</p>
								<p
									className={[
										styles.mapText,
										styles.creatorSecond,
									].join(" ")}
								>
									read comments and see user reactions
								</p>
								<p
									className={[
										styles.mapText,
										styles.creatorThird,
									].join(" ")}
								>
									create modifications for your business
								</p>
								<p
									className={[
										styles.mapText,
										styles.creatorFourth,
									].join(" ")}
								>
									make sure your business plan is perfect
								</p>
							</div>
						</CSSTransition>
					</div>
				</div>
			</div>
			<div
				className={[styles.landingWrapper, styles.landingBottomer].join(
					" "
				)}
			>
				<h1 className={styles.landingAuthorsMain}>AUTHORS DETECTED</h1>
				<div className={styles.authorsWrapper}>
					<div className={styles.authorsPhotoWrapper}>
						<img
							src={"./diplom_preview_ready.png"}
							className={styles.authorsPhoto}
						/>
					</div>
					<a
						href="https://telegram.me/maryaana"
						target="_blank"
						className={styles.maryanaTrigger}
						title="On photo: Maryana Titova"
					>
						<div className={styles.triggerHint}>Hamster</div>
					</a>
					<div className={styles.maryana}>
						<p className={styles.author}>Titova Maryana, Design</p>
						<p className={styles.authorQuote}>- "Ruku ubral"</p>
					</div>
					<a
						href="https://telegram.me/gerundos"
						target="_blank"
						className={styles.germanTrigger}
						title="On photo: Iskhakov German"
					>
						<div className={styles.triggerHint}>JS Senior</div>
					</a>
					<div className={styles.german}>
						<p className={styles.author}>
							Iskhakov German, All the rest
						</p>
						<p className={styles.authorQuote}>- "My designer"</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;

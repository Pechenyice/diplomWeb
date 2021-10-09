import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./invalideRoute.module.css";

const InvalidRoute = () => (
	<section className={["sectionDimensioned", styles.wrapper].join(" ")}>
		<div className={styles.contentWrapper}>
			<img src="./404.webp" />
			<Link to={'/'}><Button text={"Back to main page"} onClick={() => {}} /></Link>
		</div>
	</section>
);

export default InvalidRoute;

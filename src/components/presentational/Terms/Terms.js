import React from "react";
import styles from "./Terms.module.css";

const Terms = () => (
	<section className={["sectionDimensioned", styles.termsWrapper].join(' ')}>
		<h1 className={styles.termsMain}>TERMS & CONDITIONS</h1>
        <p className={styles.termsText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	</section>
);

export default Terms;

import React from "react";
import PropTypes from "prop-types";
import styles from "./CookieModal.module.css";
import gif from './hamster.gif';
import Button from "../Button/Button";

const CookieModal = ({ shouldHide, onOk }) => {
	let cookieContent = (
		<div className={styles.cookie}>
			<img src={gif}/>
			<p>This website uses cookie! And we advice it to you!</p>
            <div className={styles.closeWrapper}>
                <Button text={'ok'} onClick={onOk} />
            </div>
		</div>
	);

	return (
		<section className={styles.cookieModal}>
			{!shouldHide && cookieContent}
		</section>
	);
};

CookieModal.propTypes = {
	shouldHide: PropTypes.bool,
    onOk: PropTypes.func
};

export default CookieModal;

import React from "react";
import styles from "./Input.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Input = ({
	id,
	label,
	isEmpty,
	value,
	error = "",
	onChange,
	readonly = false,
	password = false,
}) => {
	const classes = [styles.inputWrapper];
	if (isEmpty) classes.push(styles.emptyInputWrapper);

	const labelClasses = [styles.inputLabel];
	if (!isEmpty) labelClasses.push(styles.notEmptyinputLabel);

	let [hideSymbols, setHideSymbols] = useState(password);

	function handlePasswordToText() {
		setHideSymbols(false);
	}

	function handleTextToPassword() {
		setHideSymbols(true);
	}

	return (
		<div className={classes.join(" ")}>
			<input
				className={styles.input}
				id={id}
				value={value}
				onChange={onChange}
				readOnly={readonly}
				type={hideSymbols ? "password" : "text"}
				style={{paddingRight: '50px'}}
			/>
			<label className={labelClasses.join(" ")} htmlFor={id}>
				{label}
			</label>
			<p className={styles.error}>{error}</p>
			{readonly ? (
				<div className={styles.icon}>
					<svg
						width="19"
						height="19"
						viewBox="0 0 19 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.0417 8.70834H3.95833C3.08388 8.70834 2.375 9.41722 2.375 10.2917V15.8333C2.375 16.7078 3.08388 17.4167 3.95833 17.4167H15.0417C15.9161 17.4167 16.625 16.7078 16.625 15.8333V10.2917C16.625 9.41722 15.9161 8.70834 15.0417 8.70834Z"
							stroke="#101010"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M5.54199 8.70834V5.54167C5.54199 4.49185 5.95903 3.48504 6.70136 2.7427C7.44369 2.00037 8.45051 1.58334 9.50033 1.58334C10.5501 1.58334 11.557 2.00037 12.2993 2.7427C13.0416 3.48504 13.4587 4.49185 13.4587 5.54167V8.70834"
							stroke="#101010"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			) : null}
			{password ? (
				<div
					className={[styles.icon, styles.iconDePass].join(" ")}
					onMouseEnter={handlePasswordToText}
					onMouseLeave={handleTextToPassword}
				>
					<svg
						width="19"
						height="19"
						viewBox="0 0 19 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.791992 9.5C0.791992 9.5 3.95866 3.16666 9.50033 3.16666C15.042 3.16666 18.2087 9.5 18.2087 9.5C18.2087 9.5 15.042 15.8333 9.50033 15.8333C3.95866 15.8333 0.791992 9.5 0.791992 9.5Z"
							stroke="#101010"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M0.791992 9.5C0.791992 9.5 3.95866 3.16666 9.50033 3.16666C15.042 3.16666 18.2087 9.5 18.2087 9.5C18.2087 9.5 15.042 15.8333 9.50033 15.8333C3.95866 15.8333 0.791992 9.5 0.791992 9.5Z"
							stroke="#101010"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M9.5 11.875C10.8117 11.875 11.875 10.8117 11.875 9.5C11.875 8.18832 10.8117 7.125 9.5 7.125C8.18832 7.125 7.125 8.18832 7.125 9.5C7.125 10.8117 8.18832 11.875 9.5 11.875Z"
							stroke="#101010"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			) : null}
		</div>
	);
};

Input.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	readonly: PropTypes.bool,
	password: PropTypes.bool,
	isEmpty: PropTypes.bool,
	value: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func,
};

export default Input;

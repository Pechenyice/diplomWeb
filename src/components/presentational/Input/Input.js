import React from "react";
import styles from './Input.module.css';
import PropTypes from 'prop-types';

const Input = ({ id, label, isEmpty, value, error='', onChange }) => {
    const classes = [styles.inputWrapper];
    if (isEmpty) classes.push(styles.emptyInputWrapper);

    const labelClasses = [styles.inputLabel];
    if (!isEmpty) labelClasses.push(styles.notEmptyinputLabel);

    return (
        <div className={classes.join(' ')}>
            <input className={styles.input} id={id} value={value} onChange={onChange} />
            <label className={labelClasses.join(' ')} htmlFor={id}>{label}</label>
            <p className={styles.error}>{error}</p>
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    isEmpty: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
}

export default Input;

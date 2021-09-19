import React from "react";
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({text, onClick, style={}}) => (
    <button style={style} className={styles.button} onClick={onClick}>
        {text}
    </button>
);

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
}

export default Button;

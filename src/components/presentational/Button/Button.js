import React from "react";
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({text, onClick, theme='light', style={}, className=null}) => (
    <button style={style} className={[theme === 'dark' ? styles.darkButton : styles.button, className].join(' ')} onClick={onClick}>
        {text}
    </button>
);

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.string,
    className: PropTypes.object,
    style: PropTypes.object
}

export default Button;

import React from "react";
import styles from './BusinessTag.module.css';
import PropTypes from 'prop-types';

const BusinessTag = ({ text, theme }) => (
    <div className={theme === 'dark' ? styles.darkThemeTag : styles.lightThemetag} >{text}</div>
);

BusinessTag.propTypes = {
    text: PropTypes.string,
    theme: PropTypes.string
}

export default BusinessTag;

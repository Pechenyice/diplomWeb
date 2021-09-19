import React from "react";
import styles from './BusinessTag.module.css';
import PropTypes from 'prop-types';

const BusinessTag = ({ text }) => (
    <div className={styles.tag} >{text}</div>
);

BusinessTag.propTypes = {
    text: PropTypes.string
}

export default BusinessTag;

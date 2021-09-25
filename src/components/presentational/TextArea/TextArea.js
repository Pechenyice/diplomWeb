import React from "react";
import styles from './TextArea.module.css';
import PropTypes from 'prop-types';

const TextArea = ({placeholder, onChange, value}) => {
    return (
        <textarea className={styles.area} placeholder={placeholder} onChange={onChange} value={value}>

        </textarea>
    );
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default TextArea;

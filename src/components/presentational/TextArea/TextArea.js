import React from "react";
import styles from './TextArea.module.css';
import PropTypes from 'prop-types';

const TextArea = ({placeholder, onChange}) => {
    return (
        <textarea className={styles.area} placeholder={placeholder} onChange={onChange}>

        </textarea>
    );
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default TextArea;

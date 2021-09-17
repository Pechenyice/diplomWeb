import React from "react";
import PropTypes from 'prop-types';
import styles from './ErrorsSection.module.css';

const ErrorsSection = ({ errors, onRemoveError }) => (
    <section className={styles.errorsSection}>
        {
            errors.map(e => (
                <div key={e.id} onClick={() => { onRemoveError(e.id) }}>{e.text}</div>
            ))
        }
    </section>
);

ErrorsSection.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveError: PropTypes.func
}

export default ErrorsSection;

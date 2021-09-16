import React, { useEffect } from "react";
import styles from './Preloader.module.css';
import PropTypes from 'prop-types';

const Preloader = ({isChecking, onInitAuthCheck}) => {
    useEffect(() => {
        onInitAuthCheck();
    }, []);

    return (
        <div>
            {
                isChecking ?
                <div>It is preloader</div> :
                null
            }
        </div>
    );
}

Preloader.propTypes = {
    isChecking: PropTypes.bool.isRequired,
    onInitAuthCheck: PropTypes.func.isRequired
}

export default Preloader;

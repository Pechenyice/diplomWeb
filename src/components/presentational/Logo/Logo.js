import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import PropTypes from 'prop-types';

const Logo = ({ big = false }) => (
    <>
        {
            big ?
                <div className={[styles.linkWrapper, big && styles.bigLinkWrapper].join(' ')}><span>Businass</span></div> :
                <Link to={'/'}>
                    <div className={styles.linkWrapper}><span>Businass</span><span className={styles.linkHint}>area<br /><span className={styles.linkHintHelper}>for</span><br />idea</span></div>
                </Link>
        }
    </>
);

Logo.propTypes = {
    big: PropTypes.bool
}

export default Logo;
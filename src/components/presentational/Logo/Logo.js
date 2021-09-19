import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => (
    <Link to={'/'}>
        <div className={styles.linkWrapper}><span>Business</span><span className={styles.linkHint}>area<br/><span className={styles.linkHintHelper}>for</span><br/>idea</span></div>
    </Link>
);

export default Logo;
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerBlock}>
                <Logo />
                <Link to={'/newPlan'}>Add business</Link>
            </div>
            <div className={styles.headerBlock}>
                <Link to={'/catalog'}>to catalog</Link>
                <Link to={'/profile'}>profile</Link>
            </div>
        </header>
    );
}

export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerBlock}>
            <Logo />
            <NavLink
                to={'/newPlan'}
                className={[styles.headerLink, styles.headerAfterLogoLink].join(' ')}
                activeClassName={styles.activeHeaderLink}
            >
                create a business plan
            </NavLink>
        </div>
        <div className={styles.headerBlock}>
            <NavLink
                to={'/catalog'}
                className={styles.headerLink}
                activeClassName={styles.activeHeaderLink}
            >
                catalog
            </NavLink>
            <NavLink
                to={'/profile'}
                className={styles.headerLink}
                activeClassName={styles.activeHeaderLink}
            >
                profile
            </NavLink>
        </div>
    </header>
);

export default Header;
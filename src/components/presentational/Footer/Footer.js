import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from './Footer.module.css';

const Footer = () => (
    <footer className={styles.footer}>
        <Logo />
        <div className={styles.linksWrapper}>
            <Link className={styles.footerLink} to={'/newPlan'} >Create a business plan</Link>
            <Link className={styles.footerLink} to={'/catalog'} >Catalog</Link>
            <Link className={styles.footerLink} to={'/profile/own'} >Profile</Link>
        </div>
    </footer>
);

export default Footer;

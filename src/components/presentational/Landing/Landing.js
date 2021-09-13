import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css';

const Landing = () => {
    return (
        <section className={styles.landing}>
            <div className={styles.buttonsWrapper}>
                <Link to={'/catalog'}>To catalog</Link>
                <Link to={'/profile'}>Become part of project</Link>
            </div>
        </section>
    );
}

export default Landing;
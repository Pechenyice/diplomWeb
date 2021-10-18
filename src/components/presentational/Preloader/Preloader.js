import React, { useEffect, useRef, useState } from "react";
import styles from './Preloader.module.css';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import Typed from "typed.js";
import SVGManager from "../../../svgs/svgs";

const Preloader = ({ isChecking, onInitAuthCheck }) => {
    const el = useRef(null);
    const typed = useRef(null);

    const PRELOADER = <section className={['sectionDimensioned', styles.wrapper].join(' ')}>
        <div className={styles.preloaderContent}>
            <Logo big />
            <p className={styles.preloaderText} ref={el}></p>
        </div>

        <div className={styles.preloaderAnimationWrapper}>
            <div className={styles.activator}></div>
            {
                SVGManager.getSvg('preloaderAnim')
            }
        </div>
    </section>

    let [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        onInitAuthCheck();
        setTimeout(() => setShouldHide(true), 3000);

        const options = {
            strings: [`We will make business,^300 we will make money`],
            typeSpeed: 30,
        };

        typed.current = new Typed(el.current, options);

        return () => typed.current?.destroy();
    }, []);

    return (
        <>
            {
                (isChecking || !shouldHide) && PRELOADER
            }
        </>
    );
}

Preloader.propTypes = {
    isChecking: PropTypes.bool.isRequired,
    onInitAuthCheck: PropTypes.func.isRequired
}

export default Preloader;

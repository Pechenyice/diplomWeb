import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css';
import Button from './../Button/Button';

const Landing = () => (
    <section className={['sectionDimensioned', styles.landing].join(' ')}>
        <div className={styles.landingWrapper}>
            <h1 className={styles.landingMain}>Business area<br /> for business idea</h1>
            <div className={styles.buttonsWrapper}>
                <Link to={'/catalog'} className={styles.landingLink} >
                    <Button onClick={() => { }} text={'To catalog'} />
                </Link>
                <Link to={'/profile'} className={styles.landingLink} >
                    <Button onClick={() => { }} text={'Become a member'} />
                </Link>
            </div>
        </div>
        <div className={[styles.landingWrapper, styles.landingBottomer].join(' ')}>
            <h2 className={styles.subTitle}>Authors detected</h2>
            <div className={styles.authorsWrapper}>
                <div className={styles.authorsPhotoWrapper}>
                    <img src={'./diplom_preview_ready.png'} className={styles.authorsPhoto} />
                </div>
                <a href="https://telegram.me/maryaana" target="_blank" className={styles.maryanaTrigger} title="On photo: Maryana Titova"><div className={styles.triggerHint}>Hamster</div></a>
                <div className={styles.maryana}>
                    <p className={styles.author}>Titova Maryana, Design</p>
                    <p className={styles.authorQuote}>- "Ruku ubral"</p>
                </div>
                <a href="https://telegram.me/gerundos" target="_blank" className={styles.germanTrigger} title="On photo: Iskhakov German"><div className={styles.triggerHint}>JS Senior</div></a>
                <div className={styles.german}>
                    <p className={styles.author}>Iskhakov German, All the rest</p>
                    <p className={styles.authorQuote}>- "My designer"</p>
                </div>
            </div>
        </div>
    </section>
);

export default Landing;
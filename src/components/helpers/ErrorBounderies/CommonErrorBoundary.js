import React from 'react';
import styles from "./CommonErrorBoundary.module.css";
import Button from '../../presentational/Button/Button';
import { Link } from 'react-router-dom';
import error from './error.svg';

class CommonErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className={["sectionDimensioned", styles.cob__wrapper].join(" ")}>
                    <div className={styles.cob__contentWrapper}>
                        <img src={error} />
                        <h2>Wow, something went wrong! You such a powerful wizard, that h4ck3d our site and we need to fix it! Try again from start or try later!</h2>
                        <Link to={'/'}><Button text={"Back to main page"} onClick={() => this.setState({ hasError: false })} /></Link>
                    </div>
                </section>
            );
        }

        return this.props.children;
    }
}

export default CommonErrorBoundary;

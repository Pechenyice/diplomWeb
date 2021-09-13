import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <Link to={'/'}>
            <div>Logo</div>
        </Link>
    );
}

export default Logo;
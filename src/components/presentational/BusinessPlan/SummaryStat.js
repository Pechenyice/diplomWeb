import React from "react";
import styles from './BusinessPlan.module.css';
import PropTypes from 'prop-types';

const SummaryStat = ({header, content, style}) => (
    <div style={style} className={styles.summaryStat}>
        <p className={styles.summaryHeader}>{header}</p>
        {content}
    </div>
);

SummaryStat.propTypes = {
    header: PropTypes.string,
    content: PropTypes.node,
    style: PropTypes.object
}

export default SummaryStat;

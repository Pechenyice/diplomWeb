import React, { useState } from "react";
import styles from './Select.module.css';

const Select = ({ content, propsValues, onSelect }) => {

    let sortedValues = propsValues.sort((a, b) => { return a.id - b.id });
    let [activeValueId, setActiveValueId] = useState(sortedValues[0].id);
    let [opened, setOpened] = useState(false);
    let [values, setValues] = useState(sortedValues);

    return (
        <div className={styles.selectWrapper}>
            <div className={styles.selectContent}>
                <div  className={styles.selectTextsWrapper}>
                <p className={styles.selectContentText}>{content}: &nbsp;</p>
                <p className={styles.selectContentValue}>
                    {
                        values.map(e => e.id === activeValueId && e.name)
                    }
                </p>
                </div>
                <svg className={styles.selectContentIcon} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.00002L6.32258 6.00002L12 1.00002" stroke="#101010" />
                </svg>

            </div>
        </div>
    )
}

export default Select;

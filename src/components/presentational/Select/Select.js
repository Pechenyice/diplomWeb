import React, { useState } from "react";
import styles from './Select.module.css';
import PropTypes from 'prop-types';

const Select = ({ content, propsValues, onSelect, bigSize=false }) => {

    let sortedValues = propsValues.sort((a, b) => { return a.id - b.id });
    let [activeValueId, setActiveValueId] = useState(sortedValues[0].id);
    let [opened, setOpened] = useState(false);
    let [values, setValues] = useState(sortedValues);

    function handleSwitch() {
        setOpened(!opened);
    }

    function handleValueSelected(e, id) {
        e.stopPropagation();
        handleSwitch();
        setActiveValueId(id);
        onSelect(id);
    }

    return (
        <div className={[styles.selectWrapper, opened && styles.selectWrapperActive].join(' ')} onClick={handleSwitch}>
            <div className={styles.selectContent}>
                <div  className={styles.selectTextsWrapper}>
                <p className={styles.selectContentText}>{content}: &nbsp;</p>
                <p className={[styles.selectContentValue, bigSize && styles.selectBigContentValue].join(' ')}>
                    {
                        values.map(e => e.id === activeValueId && e.name)
                    }
                </p>
                </div>
                <svg className={[styles.selectContentIcon, opened && styles.selectContentIconReverted].join(' ')} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.00002L6.32258 6.00002L12 1.00002" stroke="#101010" />
                </svg>

            </div>
            <div className={[styles.selectHidable, opened && styles.selectHidableOpened].join(' ')}>
                    <div className={styles.selectHidableContent} onClick={(e) => {e.stopPropagation();}}>
                        {
                            values.map(e => <div className={styles.selectElement} key={e.id} onClick={(ev) => {handleValueSelected(ev, e.id);}} >
                                <div className={styles.elementName} >
                                {e.name}
                                </div>
                                <div className={styles.elementTriggerWrapper}>
                                    <div className={[styles.elementTrigger, values.filter(elem => {
                                        return e.id === activeValueId;
                                    }).length && styles.elementTriggerActive].join(' ')}>
                                        <div className={styles.elementTriggerValue}></div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
            </div>
        </div>
    )
}

Select.propTypes = {
    content: PropTypes.string, 
    propsValues: PropTypes.array, 
    onSelect: PropTypes.func, 
    bigSize: PropTypes.bool
}

export default Select;

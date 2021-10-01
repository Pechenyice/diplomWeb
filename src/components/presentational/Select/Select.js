import React, { useState } from "react";
import styles from './Select.module.css';
import PropTypes from 'prop-types';

const Select = ({ content, propsValues, onSelect, bigSize=false, wantToDisplayId=null, sortByDate=false , style=null }) => {

    function getHumanizedMonth(n) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[n]
    }

    function humanizeDate(ts) {
        var dt = new Date(+ts);

        return `${getHumanizedMonth(dt.getMonth())} ${dt.getDate()}, ${dt.getFullYear()} ${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}`;
    }

    let sortedValues = !sortByDate ? propsValues.sort((a, b) => { return a.id - b.id }) : propsValues.sort((a, b) => { return +b.content.created - +a.content.created });
    let [activeValueId, setActiveValueId] = useState(wantToDisplayId || sortedValues[0].id);
    let [opened, setOpened] = useState(false);
    let [values, setValues] = useState(sortedValues);

    if (wantToDisplayId != null && activeValueId !== wantToDisplayId) setActiveValueId(wantToDisplayId);

    console.log(propsValues, wantToDisplayId,  sortedValues[0].id, wantToDisplayId || sortedValues[0].id, activeValueId, )

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
        <div className={[styles.selectWrapper, opened && styles.selectWrapperActive].join(' ')} onClick={handleSwitch} style={style}>
            <div className={styles.selectContent}>
                <div  className={styles.selectTextsWrapper}>
                <p className={styles.selectContentText}>{content}: &nbsp;</p>
                <p className={[styles.selectContentValue, bigSize && styles.selectBigContentValue].join(' ')}>
                    {
                        values.map(e => !sortByDate ? e.id === activeValueId && e.name : e.id === activeValueId && humanizeDate(e.content.created))
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
                            values.map(e => <div className={styles.selectElement} key={!sortByDate ? e.id : e.id} onClick={(ev) => {handleValueSelected(ev, !sortByDate ? e.id : e.id);}} >
                                <div className={styles.elementName} >
                                {!sortByDate ? e.name : humanizeDate(e.content.created)}
                                </div>
                                <div className={styles.elementTriggerWrapper}>
                                    <div className={[styles.elementTrigger, values.filter(elem => {
                                        let val = !sortByDate ? e.id : e.id;
                                        return  val === activeValueId;
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
    bigSize: PropTypes.bool,
    wantToDisplayId: PropTypes.number,
    sortByDate: PropTypes.bool,
    style: PropTypes.object
}

export default Select;

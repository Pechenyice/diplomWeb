import React from "react";
import PropTypes from 'prop-types';
import styles from './EventsSection.module.css';

const EventsSection = ({ errors, successes, onRemoveSuccess, onRemoveError }) => {
    let all = errors.concat(successes);

    function compare(a, b) {
        if (a.created < b.created) {
            return -1;
        }
        if (a.created > b.created) {
            return 1;
        }
        return 0;
    }

    all.sort(compare);

    return (
        <section className={styles.errorsSection}>
            {
                all.map(e => (
                    <div key={e.id} className={[styles.event, styles[e.type]].join(' ')} onClick={() => {e.type === 'error' ? onRemoveError(e.id) : onRemoveSuccess(e.id) }}>{e.text}</div>
                ))
            }
        </section>
    );
};

EventsSection.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    successes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveError: PropTypes.func,
    onRemoveSuccess: PropTypes.func
}

export default EventsSection;

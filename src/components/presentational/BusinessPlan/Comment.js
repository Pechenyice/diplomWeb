import React from "react";
import styles from './BusinessPlan.module.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Comment = ({ author, text, created, style }) => {
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

    return (
        <div style={style} className={styles.commentElem}>
            <div className={styles.commentHeader}>
                <Link to={`/profile/${author.id}/own`} ><p className={styles.commentAuthor}>{author.nickname}</p></Link>
                <p className={styles.commentDate}>{humanizeDate(created)}</p>
            </div>
            <p className={styles.commentText}>{text}</p>
        </div>
    );
}

Comment.propTypes = {
    author: PropTypes.string,
    text: PropTypes.string,
    created: PropTypes.number,
    style: PropTypes.object
}

export default Comment;

import React from "react";
import styles from './BusinessCard.module.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import BusinessTag from "../BusinessTag/BusinessTag";

const BusinessCard = ({ data }) => (
    <div className={styles.cardWrapper}>
        <Link to={`/plan/${data.id}/ed/${data.editions[0].id}`}>
            <div className={styles.cardContent}>
                <p className={styles.planName}>
                    {data.editions[0].content.name}
                </p>
                <div className={styles.reactionsWrapper}>
                    <div className={styles.reaction}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83317 18.3333H3.33317C2.89114 18.3333 2.46722 18.1577 2.15466 17.8452C1.8421 17.5326 1.6665 17.1087 1.6665 16.6667V10.8333C1.6665 10.3913 1.8421 9.96737 2.15466 9.65481C2.46722 9.34225 2.89114 9.16666 3.33317 9.16666H5.83317M11.6665 7.49999V4.16666C11.6665 3.50362 11.4031 2.86773 10.9343 2.39889C10.4654 1.93005 9.82954 1.66666 9.1665 1.66666L5.83317 9.16666V18.3333H15.2332C15.6351 18.3379 16.0252 18.197 16.3314 17.9367C16.6377 17.6763 16.8396 17.3141 16.8998 16.9167L18.0498 9.41666C18.0861 9.17779 18.07 8.93389 18.0026 8.70187C17.9353 8.46984 17.8183 8.25524 17.6597 8.07292C17.5012 7.8906 17.3049 7.74493 17.0845 7.646C16.8641 7.54708 16.6248 7.49725 16.3832 7.49999H11.6665Z" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {
                            data.editions[0].content.likes
                        }
                    </div>
                    <div className={styles.reaction}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1668 1.66668H16.6668C17.1089 1.66668 17.5328 1.84227 17.8453 2.15483C18.1579 2.46739 18.3335 2.89132 18.3335 3.33334V9.16668C18.3335 9.6087 18.1579 10.0326 17.8453 10.3452C17.5328 10.6577 17.1089 10.8333 16.6668 10.8333H14.1668M8.3335 12.5V15.8333C8.3335 16.4964 8.59689 17.1323 9.06573 17.6011C9.53457 18.07 10.1705 18.3333 10.8335 18.3333L14.1668 10.8333V1.66668H4.76683C4.36489 1.66213 3.97485 1.80301 3.66857 2.06334C3.3623 2.32367 3.16043 2.68592 3.10016 3.08334L1.95016 10.5833C1.91391 10.8222 1.93002 11.0661 1.99738 11.2981C2.06474 11.5302 2.18174 11.7448 2.34028 11.9271C2.49882 12.1094 2.6951 12.2551 2.91552 12.354C3.13594 12.4529 3.37524 12.5027 3.61683 12.5H8.3335Z" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {
                            data.editions[0].content.dislikes
                        }
                    </div>
                </div>
                <p className={styles.planDescription}>
                    {data.editions[0].content.description}
                </p>
                <div className={styles.planTagsWrapper}>
                    <BusinessTag text={data.editions[0].content.category} />
                    <BusinessTag text={data.editions[0].content.type} />
                </div>

                {/* <p>
                    {data.editions[0].content.category}
                </p>
                <p>
                    {data.editions[0].content.type}
                </p>
                <p>
                    {data.editions[0].content.created}
                </p>
                <p>
                    income: {data.editions[0].content.income.sum} {data.editions[0].content.income.text}
                </p>
                <p>
                    expence: {data.editions[0].content.expence.sum} {data.editions[0].content.expence.text}
                </p>
                {
                    data.editions.map(e => (<div key={e.id}>{e.id}</div>))
                } */}
            </div>
        </Link>
    </div>
);

BusinessCard.propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default BusinessCard;

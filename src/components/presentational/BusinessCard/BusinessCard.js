import React from "react";
import styles from "./BusinessCard.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BusinessTag from "../BusinessTag/BusinessTag";

const BusinessCard = ({ data, theme = "light", categories, types }) => (
	<div
		className={
			theme === "dark" ? styles.darkCardWrapper : styles.cardWrapper
		}
	>
		<Link to={`/plan/${data.id}/ed/${data.editions[0].id}`}>
			<div className={styles.cardContent}>
				<p className={styles.planName}>
					{data.editions[0].content.name}
				</p>
				<div className={styles.reactionsWrapper}>
					<div className={styles.reaction}>
						{theme === "light" ? (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.83317 18.3333H3.33317C2.89114 18.3333 2.46722 18.1577 2.15466 17.8452C1.8421 17.5326 1.6665 17.1087 1.6665 16.6667V10.8333C1.6665 10.3913 1.8421 9.96737 2.15466 9.65481C2.46722 9.34225 2.89114 9.16666 3.33317 9.16666H5.83317M11.6665 7.49999V4.16666C11.6665 3.50362 11.4031 2.86773 10.9343 2.39889C10.4654 1.93005 9.82954 1.66666 9.1665 1.66666L5.83317 9.16666V18.3333H15.2332C15.6351 18.3379 16.0252 18.197 16.3314 17.9367C16.6377 17.6763 16.8396 17.3141 16.8998 16.9167L18.0498 9.41666C18.0861 9.17779 18.07 8.93389 18.0026 8.70187C17.9353 8.46984 17.8183 8.25524 17.6597 8.07292C17.5012 7.8906 17.3049 7.74493 17.0845 7.646C16.8641 7.54708 16.6248 7.49725 16.3832 7.49999H11.6665Z"
									stroke="#101010"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.83366 18.3334H3.33366C2.89163 18.3334 2.46771 18.1578 2.15515 17.8452C1.84259 17.5326 1.66699 17.1087 1.66699 16.6667V10.8334C1.66699 10.3913 1.84259 9.9674 2.15515 9.65484C2.46771 9.34228 2.89163 9.16669 3.33366 9.16669H5.83366M11.667 7.50002V4.16669C11.667 3.50365 11.4036 2.86776 10.9348 2.39892C10.4659 1.93008 9.83003 1.66669 9.16699 1.66669L5.83366 9.16669V18.3334H15.2337C15.6356 18.3379 16.0256 18.197 16.3319 17.9367C16.6382 17.6764 16.8401 17.3141 16.9003 16.9167L18.0503 9.41669C18.0866 9.17782 18.0705 8.93392 18.0031 8.7019C17.9357 8.46987 17.8187 8.25527 17.6602 8.07295C17.5017 7.89063 17.3054 7.74496 17.085 7.64603C16.8645 7.54711 16.6252 7.49728 16.3837 7.50002H11.667Z"
									stroke="white"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						)}
						{
							<p className={styles.emotions}>
								{data.editions[0].content.likes}
							</p>
						}
					</div>
					<div className={styles.reaction}>
						{theme === "light" ? (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.1668 1.66668H16.6668C17.1089 1.66668 17.5328 1.84227 17.8453 2.15483C18.1579 2.46739 18.3335 2.89132 18.3335 3.33334V9.16668C18.3335 9.6087 18.1579 10.0326 17.8453 10.3452C17.5328 10.6577 17.1089 10.8333 16.6668 10.8333H14.1668M8.3335 12.5V15.8333C8.3335 16.4964 8.59689 17.1323 9.06573 17.6011C9.53457 18.07 10.1705 18.3333 10.8335 18.3333L14.1668 10.8333V1.66668H4.76683C4.36489 1.66213 3.97485 1.80301 3.66857 2.06334C3.3623 2.32367 3.16043 2.68592 3.10016 3.08334L1.95016 10.5833C1.91391 10.8222 1.93002 11.0661 1.99738 11.2981C2.06474 11.5302 2.18174 11.7448 2.34028 11.9271C2.49882 12.1094 2.6951 12.2551 2.91552 12.354C3.13594 12.4529 3.37524 12.5027 3.61683 12.5H8.3335Z"
									stroke="#101010"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) : (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.1663 1.66665H16.6663C17.1084 1.66665 17.5323 1.84224 17.8449 2.1548C18.1574 2.46736 18.333 2.89129 18.333 3.33331V9.16665C18.333 9.60867 18.1574 10.0326 17.8449 10.3452C17.5323 10.6577 17.1084 10.8333 16.6663 10.8333H14.1663M8.33301 12.5V15.8333C8.33301 16.4964 8.5964 17.1322 9.06524 17.6011C9.53408 18.0699 10.17 18.3333 10.833 18.3333L14.1663 10.8333V1.66665H4.76634C4.3644 1.6621 3.97436 1.80298 3.66809 2.06331C3.36181 2.32364 3.15994 2.68589 3.09967 3.08331L1.94967 10.5833C1.91342 10.8222 1.92953 11.0661 1.99689 11.2981C2.06425 11.5301 2.18126 11.7447 2.33979 11.9271C2.49833 12.1094 2.69461 12.255 2.91503 12.354C3.13546 12.4529 3.37475 12.5027 3.61634 12.5H8.33301Z"
									stroke="white"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						)}

						{
							<p className={styles.emotions}>
								{data.editions[0].content.dislikes}
							</p>
						}
					</div>
				</div>
				<p className={styles.planDescription}>
					{data.editions[0].content.description}
				</p>
				<div className={styles.planTagsWrapper}>
					<BusinessTag theme={theme} text={categories.content.find(e => {
						return e.id === data.editions[0].content.category;
					}).name} />
					<BusinessTag theme={theme} text={types.content.find(e => {
						return e.id === data.editions[0].content.category;
					}).name} />
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
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	theme: PropTypes.string,
	categories: PropTypes.object,
	types: PropTypes.object
};

export default BusinessCard;

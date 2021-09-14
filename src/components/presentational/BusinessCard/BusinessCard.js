import React from "react";
import styles from './BusinessCard.module.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const BusinessCard = ({ data }) => {
    return (
        <Link to={`/plan/${data.id}/ed/${data.editions[0]}`} style={{margin: '50px'}}>
            <div>
                <div>
                    {data.name}
                </div>
                <div>
                    {data.category}
                </div>
                <div>
                    {data.type}
                </div>
                <div>
                    {data.description}
                </div>
                <div>
                    {data.created}
                </div>
                <div>
                    {data.likes} {data.dislikes}
                </div>
                <div>
                    income: {data.income.sum} {data.income.text}
                </div>
                <div>
                    expence: {data.expence.sum} {data.expence.text}
                </div>
                {
                    data.editions.map(e => (<div key={e}>{e}</div>))
                }
            </div>
        </Link>
    );
}

BusinessCard.propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default BusinessCard;

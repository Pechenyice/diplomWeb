import React from "react";
import styles from './BusinessCard.module.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const BusinessCard = ({ data }) => {
    return (
        <Link to={`/plan/${data.id}/ed/${data.editions[0].id}`} style={{margin: '50px'}}>
            <div>
                <div>
                    {data.editions[0].content.name}
                </div>
                <div>
                    {data.editions[0].content.category}
                </div>
                <div>
                    {data.editions[0].content.type}
                </div>
                <div>
                    {data.editions[0].content.description}
                </div>
                <div>
                    {data.editions[0].content.created}
                </div>
                <div>
                    {data.editions[0].content.likes} {data.editions[0].content.dislikes}
                </div>
                <div>
                    income: {data.editions[0].content.income.sum} {data.editions[0].content.income.text}
                </div>
                <div>
                    expence: {data.editions[0].content.expence.sum} {data.editions[0].content.expence.text}
                </div>
                {
                    data.editions.map(e => (<div key={e.id}>{e.id}</div>))
                }
            </div>
        </Link>
    );
}

BusinessCard.propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default BusinessCard;

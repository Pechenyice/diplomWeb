import React from "react";
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from "../BusinessCard/BusinessCard";

const Catalog = ({ onFiltersSelected, onNeedMoreBusinesses, onInit, filters, shouldDisplayFilters, businesses }) => {

    useEffect(() => {
        onInit();
        if (businesses.content.length < businesses.count) onNeedMoreBusinesses();
    }, []);

    return (
        <section>
            <div onClick={() => (onFiltersSelected(filters))} >WOW</div>
            {
                shouldDisplayFilters ?
                    <div>COOL</div> :
                    <div>LOADING...</div>
            }
            {
                businesses.content.length >= businesses.count ? businesses.content.map(e => (<BusinessCard key={e.id} data={e} />)) : 'loading animation'
            }
            {
                businesses.needMore && !businesses.isLoading ? <div onClick={() => {onNeedMoreBusinesses();}}>load more</div> : businesses.needMore ? 'BUSINESS LOADING' : null
            }
        </section>
    );
}

Catalog.propTypes = {
    onInit: PropTypes.func.isRequired,
    onFiltersSelected: PropTypes.func.isRequired,
    onNeedMoreBusinesses: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    shouldDisplayFilters: PropTypes.bool.isRequired,
    businesses: PropTypes.object.isRequired
}

export default Catalog;

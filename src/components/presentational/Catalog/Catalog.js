import React from "react";
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Catalog = ({ onFiltersSelected, onNeedMoreBusinesses, onInit, filters, shouldDisplayFilters, businesses }) => {

    useEffect(() => {
        onInit();
        onNeedMoreBusinesses(businesses.offset, businesses.count, filters);
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
                businesses.content.map(e => (<div key={e.id}>{e.description}</div>))
            }
            {
                businesses.needMore && !businesses.isLoading ? <div onClick={() => {onNeedMoreBusinesses(businesses.offset, businesses.count, filters);}}>load more</div> : businesses.needMore ? 'BUSINESS LOADING' : null
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

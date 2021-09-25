import React from "react";
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from "../BusinessCard/BusinessCard";
import styles from './Catalog.module.css';
import Select from "../Select/Select";
import Button from "../Button/Button";
import { useState } from "react";

const Catalog = ({ onFiltersSelected, onNeedMoreBusinesses, onInit, filters, categories, types, shouldDisplayFilters, businesses }) => {

    useEffect(() => {
        if ((!categories.content.length && !categories.isLoading) || (!types.content.length && !types.isLoading)) onInit();
        if (businesses.content.length < businesses.count) onNeedMoreBusinesses();
    }, [filters]);

    let [state, setState] = useState({
        category: -1,
        type: -1,
        sort: 0,
        pattern: ''
    });

    function handleFiltersSubmitClick() {
        // if (JSON.stringify(filters) === JSON.stringify(state)) {
        //     return;
        // }
        setState(Object.assign({}, state));
        onFiltersSelected(state);
    }

    function handlePatternChange(e) {
        setState(Object.assign({}, state, {pattern: e.target.value}));
    }

    function handleCategorySelected(id) {
        setState(Object.assign({}, state, {category: id}));
    }

    function handleTypeSelected(id) {
        setState(Object.assign({}, state, {type: id}));
    }
    
    function handleSortSelected(id) {
        setState(Object.assign({}, state, {sort: id}));
    }

    return (
        <section className={['sectionDimensioned', styles.catalogWrapper].join(' ')}>
            <h1 className={styles.catalogMainText}>CATALOG</h1>
            {/* <div onClick={() => (onFiltersSelected(filters))} >WOW</div> */}
            {
                shouldDisplayFilters ?
                    <div className={styles.filtersWrapper}>
                        <div className={styles.filtersSection}>
                            <div className={styles.searchInputWrapper}>
                                <input placeholder={'Search...'} type={'text'} className={styles.searchInput} onChange={handlePatternChange} />
                                <svg className={styles.searchInputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#7D7D7D" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.5 17.5L13.875 13.875" stroke="#7D7D7D" strokeLinecap="square" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={styles.filtersElement}>
                                <Select 
                                    content={'Category'}
                                    propsValues={categories.content.concat({id: -1, name: 'All'})}
                                    onSelect={handleCategorySelected}
                                />
                            </div>
                            <div className={styles.filtersElement}>
                                <Select 
                                content={'Type'}
                                propsValues={types.content.concat({id: -1, name: 'All'})}
                                onSelect={handleTypeSelected}
                                />
                            </div>
                            <div className={styles.filtersElement}>
                                <Select 
                                content={'Sort by'}
                                propsValues={[{id: 0, name: 'Popular'}, {id: 1, name: 'New first'}, {id: 2, name: 'Old first'}]}
                                onSelect={handleSortSelected}
                                />
                            </div>
                            <div className={styles.filtersElement}>
                                <Button text={'Search'} onClick={handleFiltersSubmitClick}/>
                            </div>
                        </div>
                    </div> :
                    <div><p>Try to load filters from server...</p></div>
            }
            <div className={styles.catalogContent}>
                <div className={styles.catalogBusinesses}>
                    {
                        (businesses.content.length >= businesses.count || !businesses.needMore) && categories.content.length && types.content.length ? businesses.content.map(e => (<BusinessCard key={e.id} data={e} categories={categories} types={types} />)) : 'loading animation'
                    }
                </div>
                {
                    businesses.needMore && !businesses.isLoading ? <div className={styles.catalogLoadEventTrigger} onClick={() => { onNeedMoreBusinesses(); }}><p>LOAD MORE</p></div> : businesses.needMore ? <div className={styles.catalogLoadEventTrigger} ><p>Businesses loading...</p></div> : null
                }
            </div>
        </section>
    );
}

Catalog.propTypes = {
    onInit: PropTypes.func.isRequired,
    onFiltersSelected: PropTypes.func.isRequired,
    onNeedMoreBusinesses: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    shouldDisplayFilters: PropTypes.bool.isRequired,
    businesses: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired
}

export default Catalog;

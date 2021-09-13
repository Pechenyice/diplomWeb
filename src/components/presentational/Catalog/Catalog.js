import React from "react";
import { useEffect } from 'react';
import actions from './../../../redux/actions';
import { useDispatch } from 'react-redux';

const Catalog = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(actions.fetchCategories());
      dispatch(actions.fetchTypes());
    }, []);

    return (
        <section onClick={() => (props.onFiltersSelected(props.filters))}>
            WOW
            {
                props.shouldDisplayFilters ?
                <div>COOL</div> :
                <div>LOADING...</div>
            }
        </section>
    );
}

export default Catalog;

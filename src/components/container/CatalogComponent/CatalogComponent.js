import React from "react";
import { connect } from "react-redux";
import Catalog from "../../presentational/Catalog/Catalog";
import actions from '../../../redux/actions';

const CatalogComponent = connect(mapStateToProps, mapDispatchToProps)(Catalog);

function mapStateToProps(state) {
    return {
        shouldDisplayFilters: !state.categories.isLoading && !state.types.isLoading,
        filters: state.businesses.filters,
        bussineses: state.bussineses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFiltersSelected: filters => {
            dispatch(actions.applyFilters(filters));
        }
    };
}

export default CatalogComponent;

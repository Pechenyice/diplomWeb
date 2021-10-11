import React from "react";
import { connect } from "react-redux";
import Catalog from "../../presentational/Catalog/Catalog";
import actions from '../../../redux/actions';

const CatalogComponent = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(Catalog);

function mapStateToProps(state) {
    return {
        shouldDisplayFilters: !state.categories.isLoading && !state.types.isLoading,
        filters: state.filters,
        businesses: state.businesses,
        categories: state.categories,
        types: state.types,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onInit: () => {
            dispatch(actions.fetchCategories());
            dispatch(actions.fetchTypes());
        },
        onFiltersSelected: filters => {
            dispatch(actions.applyFilters(filters));
        },
        dispatch
    };
}

function mergePropsWithDispatch(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        onNeedMoreBusinesses: (offset, filters) => {
            dispatchProps.dispatch(actions.fetchBusinesses(offset !== null ? offset : stateProps.businesses.offset, stateProps.businesses.count, filters || stateProps.filters));
        }
    }
};

export default CatalogComponent;

import Client from "../Client/Client"

const actions = {
    types: {
        APPLY_FILTERS: 'APPLY_FILTERS',
        CATEGORIES_REQUEST_STARTED: 'CATEGORIES_REQUEST_STARTED',
        CATEGORIES_REQUEST_FAILED: 'CATEGORIES_REQUEST_FAILED',
        CATEGORIES_REQUEST_SUCCESSED: 'CATEGORIES_REQUEST_SUCCESSED',
        TYPES_REQUEST_STARTED: 'TYPES_REQUEST_STARTED',
        TYPES_REQUEST_FAILED: 'TYPES_REQUEST_FAILED',
        TYPES_REQUEST_SUCCESSED: 'TYPES_REQUEST_SUCCESSED'
    },

    applyFilters: function (filters) {
        return {
            type: this.types.APPLY_FILTERS,
            filters
        }
    },

    fetchCategoriesRequest: function () {
        return {
            type: this.types.CATEGORIES_REQUEST_STARTED
        }
    },

    fetchCategoriesSuccess: function (categories) {
        return {
            type: this.types.CATEGORIES_REQUEST_SUCCESSED,
            categories
        }
    },

    fetchCategoriesFail: function () {
        return {
            type: this.types.CATEGORIES_REQUEST_FAILED
        }
    },

    fetchCategories: function () {
        return (dispatch) => {
            dispatch(this.fetchCategoriesRequest());
            Client.loadCategories()
                .then((categories) => {
                    dispatch(this.fetchCategoriesSuccess(categories));
                })
                // .catch(() => {
                //     dispatch(this.fetchCategoriesFail());
                // })
        }
    },

    fetchTypesRequest: function () {
        return {
            type: this.types.TYPES_REQUEST_STARTED
        }
    },

    fetchTypesSuccess: function (types) {
        return {
            type: this.types.TYPES_REQUEST_SUCCESSED,
            types
        }
    },

    fetchTypesFail: function () {
        return {
            type: this.types.TYPES_REQUEST_FAILED
        }
    },

    fetchTypes: function () {
        return (dispatch) => {
            console.log(dispatch)
            dispatch(this.fetchTypesRequest());
            Client.loadTypes()
                .then((types) => {
                    dispatch(this.fetchTypesSuccess(types));
                })
                // .catch(() => {
                //     dispatch(this.fetchTypesFail());
                // })
        }
    }
}

export default actions;

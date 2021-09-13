import Client from "../Client/Client"

const actions = {
    types: {
        APPLY_FILTERS: 'APPLY_FILTERS',
        REMOVE_ERROR: 'REMOVE_ERROR',
        ADD_ERROR: 'ADD_ERROR',
        CATEGORIES_REQUEST_STARTED: 'CATEGORIES_REQUEST_STARTED',
        CATEGORIES_REQUEST_FAILED: 'CATEGORIES_REQUEST_FAILED',
        CATEGORIES_REQUEST_SUCCESSED: 'CATEGORIES_REQUEST_SUCCESSED',
        TYPES_REQUEST_STARTED: 'TYPES_REQUEST_STARTED',
        TYPES_REQUEST_FAILED: 'TYPES_REQUEST_FAILED',
        TYPES_REQUEST_SUCCESSED: 'TYPES_REQUEST_SUCCESSED',
        BUSINESSES_REQUEST_STARTED: 'BUSINESSES_REQUEST_STARTED',
        BUSINESSES_REQUEST_FAILED: 'BUSINESSES_REQUEST_FAILED',
        BUSINESSES_REQUEST_SUCCESSED: 'BUSINESSES_REQUEST_SUCCESSED'
    },

    applyFilters: function (filters) {
        return {
            type: this.types.APPLY_FILTERS,
            filters
        }
    },

    removeError: function(id) {
        return {
            type: this.types.REMOVE_ERROR,
            id
        }
    },

    addError: function(text) {
        return {
            type: this.types.ADD_ERROR,
            text
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
                .catch(() => {
                    dispatch(this.fetchCategoriesFail());
                    dispatch(this.addError('Failed load categories for businesses!'));
                })
        }
    },

    fetchBusinessesRequest: function () {
        return {
            type: this.types.BUSINESSES_REQUEST_STARTED
        }
    },

    fetchBusinessesSuccess: function (result) {
        return {
            type: this.types.BUSINESSES_REQUEST_SUCCESSED,
            result
        }
    },

    fetchBusinessesFail: function () {
        return {
            type: this.types.BUSINESSES_REQUEST_FAILED
        }
    },

    fetchBusinesses: function(offset, count, filters) {
        return (dispatch) => {
            dispatch(this.fetchBusinessesRequest());
            Client.loadBusinesses(offset, count, filters)
                .then((result) => {
                    dispatch(this.fetchBusinessesSuccess(result));
                })
                .catch(() => {
                    dispatch(this.fetchBusinessesFail());
                    dispatch(this.addError('Failed load businesses!'));
                })
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
            dispatch(this.fetchTypesRequest());
            Client.loadTypes()
                .then((types) => {
                    dispatch(this.fetchTypesSuccess(types));
                })
                .catch(() => {
                    dispatch(this.fetchTypesFail());
                    dispatch(this.addError('Failed load types for businesses!'));
                })
        }
    }
}

export default actions;

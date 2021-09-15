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
        BUSINESSES_REQUEST_SUCCESSED: 'BUSINESSES_REQUEST_SUCCESSED',
        FIND_ACTIVE_PLAN: 'FIND_ACTIVE_PLAN',
        NULLIFY_ACTIVE_PLAN: 'NULLIFY_ACTIVE_PLAN',
        PLAN_REQUEST_STARTED: 'PLAN_REQUEST_STARTED',
        PLAN_REQUEST_SUCCESSED: 'PLAN_REQUEST_SUCCESSED',
        PLAN_REQUEST_FAILED: 'PLAN_REQUEST_FAILED',
        COMMENTS_REQUEST_STARTED: 'COMMENTS_REQUEST_STARTED',
        COMMENTS_REQUEST_SUCCESSED: 'COMMENTS_REQUEST_SUCCESSED',
        COMMENTS_REQUEST_FAILED: 'COMMENTS_REQUEST_FAILED'
    },

    findPlan: function({planId, edId}) {
        return {
            type: this.types.FIND_ACTIVE_PLAN,
            q: {
                planId,
                edId
            }
        }
    },

    clearPlanInfo: function() {
        return {
            type: this.types.NULLIFY_ACTIVE_PLAN
        }
    },

    fetchPlanRequest: function () {
        return {
            type: this.types.PLAN_REQUEST_STARTED
        }
    },

    fetchPlanSuccess: function (plan, planId, edId) {
        return {
            type: this.types.PLAN_REQUEST_SUCCESSED,
            plan,
            planId, 
            edId
        }
    },

    fetchPlanFail: function () {
        return {
            type: this.types.PLAN_REQUEST_FAILED
        }
    },

    fetchPlan: function ({planId, edId}) {
        return (dispatch) => {
            dispatch(this.fetchPlanRequest());
            Client.loadPlan(planId, edId)
                .then((plan) => {
                    dispatch(this.fetchPlanSuccess(plan, planId, edId));
                })
                .catch(() => {
                    dispatch(this.fetchPlanFail());
                    dispatch(this.addError('Failed load current business plan!'));
                })
        }
    },

    applyFilters: function(filters) {
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

    fetchCommentsRequest: function () {
        return {
            type: this.types.COMMENTS_REQUEST_STARTED
        }
    },

    fetchCommentsSuccess: function (result) {
        return {
            type: this.types.COMMENTS_REQUEST_SUCCESSED,
            result
        }
    },

    fetchCommentsFail: function () {
        return {
            type: this.types.COMMENTS_REQUEST_FAILED
        }
    },

    fetchInitialComments: function(businessId, edId, offset, count) {
        return (dispatch) => {
            dispatch(this.fetchCommentsRequest());
            Client.loadComments(businessId, edId, offset, count)
                .then((result) => {
                    dispatch(this.fetchCommentsSuccess(result));
                })
                .catch(() => {
                    dispatch(this.fetchCommentsFail());
                    dispatch(this.addError('Failed load comments!'));
                })
        }
    },

    fetchComments: function(businessId, edId, offset, count) {
        return (dispatch) => {
            dispatch(this.fetchCommentsRequest());
            Client.loadComments(businessId, edId, offset, count)
                .then((result) => {
                    dispatch(this.fetchCommentsSuccess(result));
                })
                .catch(() => {
                    dispatch(this.fetchCommentsFail());
                    dispatch(this.addError('Failed load comments!'));
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

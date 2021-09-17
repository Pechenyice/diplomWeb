const Client = {
    apiPath: '/api',

    constructUrl: function (path) {
        return `${this.apiPath}${path}`;
    },

    checkStatus: function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(`HTTP Error ${response.statusText}`);
            error.status = response.statusText;
            error.response = response;
            throw error;
        }
    },

    safeFetch: function (url, method, controller) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            });
    },

    aborts: {
        LOAD_CATEGORIES_CONTROLLER: new AbortController(),
        LOAD_TYPES_CONTROLLER: new AbortController(),
        LOAD_BUSINESSES_CONTROLLER: new AbortController(),
        LOAD_COMMENTS_CONTROLLER: new AbortController(),
        LOAD_PLAN_CONTROLLER: new AbortController(),
        LOAD_AUTH_DATA_CONTROLLER: new AbortController(),
        LOAD_USER_AUTH_CHECK_DATA_CONTROLLER: new AbortController(),
        LOAD_OWN_PLANS_CONTROLLER: new AbortController(),
        LOAD_LIKED_PLANS_CONTROLLER: new AbortController(),
        LOAD_DISLIKED_PLANS_CONTROLLER: new AbortController()
    },

    loadCategories: function () {
        return this.safeFetch(this.constructUrl('/getFiltersCategories'), 'GET', this.aborts.LOAD_CATEGORIES_CONTROLLER);
    },

    abortloadCategoriesFetch: function () {
        this.aborts.LOAD_CATEGORIES_CONTROLLER.abort();
        this.aborts.LOAD_CATEGORIES_CONTROLLER = new AbortController();
    },

    loadTypes: function () {
        return this.safeFetch(this.constructUrl('/getFiltersTypes'), 'GET', this.aborts.LOAD_TYPES_CONTROLLER);
    },

    abortLoadTypesFetch: function () {
        this.aborts.LOAD_TYPES_CONTROLLER.abort();
        this.aborts.LOAD_TYPES_CONTROLLER = new AbortController();
    },

    loadBusinesses: function (offset, count, filters) {
        return this.safeFetch(this.constructUrl(`/getBusinesses?offset=${offset}&count=${count}&f_category=${filters.category}&f_type=${filters.type}&f_pattern=${filters.pattern}`), 'GET', this.aborts.LOAD_BUSINESSES_CONTROLLER);
    },

    abortLoadBusinessesFetch: function () {
        this.aborts.LOAD_BUSINESSES_CONTROLLER.abort();
        this.aborts.LOAD_BUSINESSES_CONTROLLER = new AbortController();
    },

    loadComments: function (businessId, edId, offset, count) {
        return this.safeFetch(this.constructUrl(`/getComments?businessId=${businessId}&edId=${edId}&offset=${offset}&count=${count}`), 'GET', this.aborts.LOAD_COMMENTS_CONTROLLER);
    },

    abortLoadCommentsFetch: function () {
        this.aborts.LOAD_COMMENTS_CONTROLLER.abort();
        this.aborts.LOAD_COMMENTS_CONTROLLER = new AbortController();
    },

    loadPlan: function (planId, edId) {
        return this.safeFetch(this.constructUrl(`/getPlan?planId=${planId}&edId=${edId}`), 'GET', this.aborts.LOAD_PLAN_CONTROLLER);
    },

    abortLoadPlanFetch: function () {
        this.aborts.LOAD_PLAN_CONTROLLER.abort();
        this.aborts.LOAD_PLAN_CONTROLLER = new AbortController();
    },

    loadAuthData: function () {
        return this.safeFetch(this.constructUrl(`/auth`), 'POST', this.aborts.LOAD_AUTH_DATA_CONTROLLER);
    },

    abortLoadAuthDataFetch: function () {
        this.aborts.LOAD_AUTH_DATA_CONTROLLER.abort();
        this.aborts.LOAD_AUTH_DATA_CONTROLLER = new AbortController();
    },

    loadUserAuthCheckData: function () {
        return this.safeFetch(this.constructUrl('/checkToken'), 'POST', this.aborts.LOAD_USER_AUTH_CHECK_DATA_CONTROLLER);
    },

    abortLoadUserAuthCheckDataFetch: function () {
        this.aborts.LOAD_USER_AUTH_CHECK_DATA_CONTROLLER.abort();
        this.aborts.LOAD_USER_AUTH_CHECK_DATA_CONTROLLER = new AbortController();
    },

    loadOwnPlans: function (userId) {
        return this.safeFetch(this.constructUrl(`/getOwnPlans?userId=${userId}`), 'GET', this.aborts.LOAD_OWN_PLANS_CONTROLLER);
    },

    abortLoadOwnPlansFetch: function () {
        this.aborts.LOAD_OWN_PLANS_CONTROLLER.abort();
        this.aborts.LOAD_OWN_PLANS_CONTROLLER = new AbortController();
    },

    loadLikedPlans: function (userId) {
        return this.safeFetch(this.constructUrl(`/getLikedPlans?userId=${userId}`), 'GET', this.aborts.LOAD_LIKED_PLANS_CONTROLLER);
    },

    abortLoadLikedPlansFetch: function () {
        this.aborts.LOAD_LIKED_PLANS_CONTROLLER.abort();
        this.aborts.LOAD_LIKED_PLANS_CONTROLLER = new AbortController();
    },

    loadDislikedPlans: function (userId) {
        return this.safeFetch(this.constructUrl(`/getDislikedPlans?userId=${userId}`), 'GET', this.aborts.LOAD_DISLIKED_PLANS_CONTROLLER);
    },

    abortLoadDislikedPlansFetch: function () {
        this.aborts.LOAD_DISLIKED_PLANS_CONTROLLER.abort();
        this.aborts.LOAD_DISLIKED_PLANS_CONTROLLER = new AbortController();
    }
}

export default Client;

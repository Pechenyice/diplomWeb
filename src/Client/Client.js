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

    safeFetch: function (url, method, controller, body={}) {

        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        }

        if (method === 'POST') options['body'] = JSON.stringify(body);
        if (method === 'PUT') options['body'] = JSON.stringify(body);

        return fetch(url, options)
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
        LOAD_DISLIKED_PLANS_CONTROLLER: new AbortController(),
        SEND_SIGN_UP_CONTROLLER: new AbortController(),
        LOAD_USER_NICKNAME_CONTROLLER: new AbortController(),
        LOGOUT_CONTROLLER: new AbortController(),
        UPDATE_PROFILE_DATA_CONTROLLER: new AbortController(),
        UPDATE_PROFILE_PASSWORD_CONTROLLER: new AbortController(),
        CREATE_NEW_PLAN_CONTROLLER: new AbortController(),
        CREATE_PLAN_EDITION_CONTROLLER: new AbortController()
    },

    createPlanEdition: function(data) {
        return this.safeFetch(this.constructUrl('/createPlanEdition'), 'POST', this.aborts.CREATE_PLAN_EDITION_CONTROLLER, {data});
    },

    abortCreatePlanEdition: function () {
        this.aborts.CREATE_PLAN_EDITION_CONTROLLER.abort();
        this.aborts.CREATE_PLAN_EDITION_CONTROLLER = new AbortController();
    },

    createNewPlan: function(data) {
        return this.safeFetch(this.constructUrl('/createNewPlan'), 'POST', this.aborts.CREATE_NEW_PLAN_CONTROLLER, {data});
    },

    abortCreateNewPlan: function () {
        this.aborts.CREATE_NEW_PLAN_CONTROLLER.abort();
        this.aborts.CREATE_NEW_PLAN_CONTROLLER = new AbortController();
    },

    updateProfilePassword: function(oldPassword, password) {
        return this.safeFetch(this.constructUrl('/updateProfilePassword'), 'PUT', this.aborts.UPDATE_PROFILE_PASSWORD_CONTROLLER, {oldPassword, password});
    }, 

    abortUpdateProfilePassword: function () {
        this.aborts.UPDATE_PROFILE_PASSWORD_CONTROLLER.abort();
        this.aborts.UPDATE_PROFILE_PASSWORD_CONTROLLER = new AbortController();
    },

    updateProfileData: function(nickname) {
        return this.safeFetch(this.constructUrl('/updateProfileData'), 'PUT', this.aborts.UPDATE_PROFILE_DATA_CONTROLLER, {nickname});
    }, 

    abortUpdateProfileData: function () {
        this.aborts.UPDATE_PROFILE_DATA_CONTROLLER.abort();
        this.aborts.UPDATE_PROFILE_DATA_CONTROLLER = new AbortController();
    },

    logout: function () {
        return this.safeFetch(this.constructUrl('/logout'), 'GET', this.aborts.LOGOUT_CONTROLLER);
    },

    abortLogout: function () {
        this.aborts.LOGOUT_CONTROLLER.abort();
        this.aborts.LOGOUT_CONTROLLER = new AbortController();
    },

    sendSignUpRequest: function(login, nickname, password) {
        return this.safeFetch(this.constructUrl('/addUser'), 'POST', this.aborts.SEND_SIGN_UP_CONTROLLER, {login, nickname, password});
    },

    abortSendSignUpRequest: function () {
        this.aborts.SEND_SIGN_UP_CONTROLLER.abort();
        this.aborts.SEND_SIGN_UP_CONTROLLER = new AbortController();
    },

    loadCategories: function () {
        return this.safeFetch(this.constructUrl('/getFiltersCategories'), 'GET', this.aborts.LOAD_CATEGORIES_CONTROLLER);
    },

    abortLoadCategoriesFetch: function () {
        this.aborts.LOAD_CATEGORIES_CONTROLLER.abort();
        this.aborts.LOAD_CATEGORIES_CONTROLLER = new AbortController();
    },

    loadUserNickname: function(id) {
        return this.safeFetch(this.constructUrl(`/getUserNickname?id=${id}`), 'GET', this.aborts.LOAD_USER_NICKNAME_CONTROLLER);
    },

    abortLoadUserNickname: function () {
        this.aborts.LOAD_USER_NICKNAME_CONTROLLER.abort();
        this.aborts.LOAD_USER_NICKNAME_CONTROLLER = new AbortController();
    },

    loadTypes: function () {
        return this.safeFetch(this.constructUrl('/getFiltersTypes'), 'GET', this.aborts.LOAD_TYPES_CONTROLLER);
    },

    abortLoadTypesFetch: function () {
        this.aborts.LOAD_TYPES_CONTROLLER.abort();
        this.aborts.LOAD_TYPES_CONTROLLER = new AbortController();
    },

    loadBusinesses: function (offset, count, filters) {
        return this.safeFetch(this.constructUrl(`/getBusinesses?offset=${offset}&count=${count}&f_category=${filters.category}&f_type=${filters.type}&f_pattern=${filters.pattern}&f_sort=${filters.sort}`), 'GET', this.aborts.LOAD_BUSINESSES_CONTROLLER);
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

    loadAuthData: function (login, password) {
        return this.safeFetch(this.constructUrl(`/auth`), 'POST', this.aborts.LOAD_AUTH_DATA_CONTROLLER, {login, password});
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

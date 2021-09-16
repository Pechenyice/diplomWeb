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
            console.log(error);
            throw error;
        }
    },

    safeFetch: function(url, method) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            });
    },

    loadCategories: function () {
        return this.safeFetch(this.constructUrl('/getFiltersCategories'), 'GET');
    },

    loadTypes: function () {
        return this.safeFetch(this.constructUrl('/getFiltersTypes'), 'GET');
    },

    loadBusinesses: function (offset, count, filters) {
        return this.safeFetch(this.constructUrl(`/getBusinesses?offset=${offset}&count=${count}&f_category=${filters.category}&f_type=${filters.type}&f_pattern=${filters.pattern}`), 'GET');
    },

    loadComments: function (businessId, edId, offset, count) {
        return this.safeFetch(this.constructUrl(`/getComments?businessId=${businessId}&edId=${edId}&offset=${offset}&count=${count}`), 'GET');
    },

    loadPlan: function (planId, edId) {
        return this.safeFetch(this.constructUrl(`/getPlan?planId=${planId}&edId=${edId}`), 'GET');
    },

    loadAuthData: function() {
        return this.safeFetch(this.constructUrl(`/auth`), 'POST');
    },

    loadUserAuthCheckData: function() {
        return this.safeFetch(this.constructUrl('/checkToken'), 'POST');
    },

    loadOwnPlans: function(userId) {
        return this.safeFetch(this.constructUrl(`/getOwnPlans?userId=${userId}`, 'GET'));
    },

    loadLikedPlans: function(userId) {
        return this.safeFetch(this.constructUrl(`/getLikedPlans?userId=${userId}`, 'GET'));
    },

    loadDislikedPlans: function(userId) {
        return this.safeFetch(this.constructUrl(`/getDislikedPlans?userId=${userId}`, 'GET'));
    }
}

export default Client;

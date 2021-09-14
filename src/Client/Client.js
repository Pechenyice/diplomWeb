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

    loadCategories: function () {
        return fetch(this.constructUrl('/getFiltersCategories'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            });
    },

    loadTypes: function () {
        return fetch(this.constructUrl('/getFiltersTypes'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            });
    },

    loadBusinesses: function (offset, count, filters) {
        return fetch(this.constructUrl(`/getBusinesses?offset=${offset}&count=${count}&f_category=${filters.category}&f_type=${filters.type}&f_pattern=${filters.pattern}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            });
    },

    loadPlan: function (planId, edId) {
        return fetch(this.constructUrl(`/getPlan?planId=${planId}&edId=${edId}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.checkStatus)
            .then((response) => {
                return response.json();
            });
    }
}

export default Client;

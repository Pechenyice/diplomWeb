const Client = {
    loadCategories: function () {
        return {
            then: function (cb) {
                setTimeout(() => {
                    cb([])
                }, 1000);
            },
            catch: function (cb) {
                setTimeout(() => {
                    cb([])
                }, 1000);
            }
        }
    },

    loadTypes: function () {
        return {
            then: function (cb) {
                setTimeout(() => {
                    cb([])
                }, 1000);
            },
            catch: function (cb) {
                setTimeout(() => {
                    cb([])
                }, 1000);
            }
        }
    },
}

export default Client;

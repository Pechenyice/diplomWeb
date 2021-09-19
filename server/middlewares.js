const dbUtils = require('./dbUtils');

const middlewares = {
    bindLogs: function(req, res, next) {
        console.log(`User action:\nip: ${req.ip}\npath: ${req.originalUrl}`)
        next();
    },

    bindAuth: function(req, res, next) {
        if (!req.cookies.authToken) {
            res.send(JSON.stringify({AUTH: 'FAIL'}));
            return;
        }

        (async () => {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);
            
            console.log(result)

            if (!result.length) {
                res.send(JSON.stringify({AUTH: 'FAIL'}));
                return;
            }

            if (result[0].ip != req.ip) {
                res.send(JSON.stringify({AUTH: 'FAIL'}));
                return;
            }

            if (result[0].death_date < Date.now()) {
                res.send(JSON.stringify({AUTH: 'FAIL'}));
                dbUtils.dropToken(result[0].body);
                return;
            }

            next();
        })();
    }
};

module.exports = middlewares;

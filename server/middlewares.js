const middlewares = {
    bindLogs: function(req, res, next) {
        console.log(`User action:\nip: ${req.ip}\npath: ${req.originalUrl}`)
        next();
    },

    bindAuth: function(req, res, next) {
        res.send(JSON.stringify({AUTH: 'FAIL'}));
        return;

        console.log(`Cookies: ${req.cookies}\nSignedCookies: ${req.signedCookies}\n\n`)
        next();
    }
};

module.exports = middlewares;

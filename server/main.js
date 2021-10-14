const express = require('express');
const app = express();
if (process.env.ENV !== 'DOCKERDEV') {
    require('dotenv').config();
    console.log("LOADED WITH DOTENV ENV");
} else {
    console.log("LOADED WITH DOCKER_COMPOSE ENV");
}
const port = process.env.PORT || 3001;
const RABBIT_CACHE_SERVICE = process.env.CACHESERVICE;
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');
const middlewares = require('./middlewares');
const cookieParser = require('cookie-parser');
const dbUtils = require('./dbUtils');
const Gateway = require('micromq/gateway');

const gateway = new Gateway({
    microservices: [RABBIT_CACHE_SERVICE],
    rabbit: {
        url: process.env.RABBITURL,
    },
    requests: {
        timeout: 30000,
    },
});
app.use(gateway.middleware());

app.use(express.json());
app.use(cookieParser());

if (process.env.ENV === 'LOCALDEV' || process.env.ENV === 'DOCKERDEV') app.use(middlewares.bindLogs);

const API_ANSWER_DELAY = 1000;
const TOKEN_LIFETIME = process.env.TOKENLIFETIME;

const CATEGORIES = [
    { id: 0, name: 'Franchise' },
    { id: 1, name: 'Startup' },
    { id: 2, name: 'Small business' },
    { id: 3, name: 'Big business' },
    { id: 4, name: 'We will do business, we will do money' }
];
const TYPES = [
    { id: 0, name: 'Food' },
    { id: 1, name: 'IT' },
];

function arrangeAbort(cause) {
    return JSON.stringify({
        success: false,
        cause
    });
}

app.post('/api/checkToken', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.post('/api/createPlanEdition', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.post('/api/createNewPlan', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.put('/api/updateProfilePassword', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.put('/api/updateProfileData', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.post('/api/deletePlan', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.post('/api/setReaction', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.post('/api/publishComment', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getUserNickname', async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getComments', async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getBusinesses', async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getPlan', async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getOwnPlans', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getLikedPlans', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getDislikedPlans', middlewares.bindAuth, async (req, res) => {
    await res.delegate(RABBIT_CACHE_SERVICE);
});

app.get('/api/getFiltersTypes', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(TYPES));
    }, API_ANSWER_DELAY);
});

app.get('/api/getFiltersCategories', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(CATEGORIES));
    }, API_ANSWER_DELAY);
});

app.post('/api/addUser', async (req, res) => {
    let { id, answer, login, nickname } = await dbUtils.addUser(req.body);

    if (!answer) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let [result, fields] = answer;

    if (result.affectedRows) {
        let token = await dbUtils.setToken(id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);
        res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });

        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                id,
                login,
                nickname
            }));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        res.send(arrangeAbort('Duplicate login or nickname, change it please!'));
    }, API_ANSWER_DELAY);
});

app.get('/api/logout', async (req, res) => {
    let [result, fields] = req.cookies.authToken ? await dbUtils.getUserByToken(req.cookies.authToken) : [null, null];

    if (result?.length === 1) {
        dbUtils.dropToken(result[0].body);
        res.cookie('authToken', '', { maxAge: Date.now() });
    }

    setTimeout(() => {
        res.send(JSON.stringify({
            success: true
        }));
    }, API_ANSWER_DELAY);
});

app.post('/api/auth', async (req, res) => {
    let [result, fields] = await dbUtils.getUser(req.body);

    if (!result) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    if (result.length == 1) {
        let token = await dbUtils.setToken(result[0]._id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);

        res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });

        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                id: result[0]._id,
                login: result[0].login,
                nickname: result[0].nickname
            }));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        res.send(arrangeAbort('No such user, please check login or password!'));
    }, API_ANSWER_DELAY);
});

function onServerStart() {
    try {
        dbUtils.initTypes(TYPES);
    } catch (e) {
        console.log(e);
    }
    try {
        dbUtils.initCategories(CATEGORIES);
    } catch (e) {
        console.log(e);
    }
    console.log('Server routing:', app._router.stack.map(e => e.route ? 'api route: ' + e.route?.path + e.route?.methods.toString() : 'api middleware: ' + JSON.stringify(e)))
}

fs.readFile('./TODO', (_, content) => {
    app.listen(port, () => {
        console.log();
        console.log(`Main server listening at :${port}`);
        console.log(chalk.bgYellow.whiteBright.bold(`\nTODO:\n`));
        console.log(chalk.yellowBright(content) + '\n\n');

        onServerStart();
    })
});
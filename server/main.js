const express = require('express');
const app = express();
if (process.env.ENV !== 'DOCKERDEV') {
    require('dotenv').config();
    console.log("LOADED WITH DOTENV ENV");
} else {
    console.log("LOADED WITH DOCKER_COMPOSE ENV");
}
const port = process.env.PORT || 3001;
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');
const middlewares = require('./middlewares');
const cookieParser = require('cookie-parser');
const dbUtils = require('./dbUtils');

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

function getReqData(req) {
    return {
        path: req.url,
        body: req.body,
        cookies: req.cookies,
        query: req.query,
        ip: req.ip,
        params: req.params,
    };
}

let channel = null;
async function delegate(req, res, callback) {
    let msg = await amqpClient.sendRPCMessage(channel, getReqData(req), 'rpc_queue');
    msg = JSON.parse(msg);
    if (msg.success && callback) {
        callback(req, res, msg);
    }
    setTimeout(() => {
        res.send(JSON.stringify(msg));
    }, API_ANSWER_DELAY);
}

const amqpClient = require('./services/dataManager/amqpClient');

amqpClient.createClient({ url: 'amqp://localhost:5672' })
    .then(ch => {
        channel = ch;
    });

app.post('/api/checkToken', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/createPlanEdition', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/createNewPlan', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/logout', async (req, res) => delegate(req, res, (req, res, msg) => { if (msg.dropToken) res.cookie('authToken', '', { maxAge: Date.now() }); }));

app.put('/api/updateProfilePassword', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.put('/api/updateProfileData', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/deletePlan', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/addUser', async (req, res) => delegate(req, res, (req, res, msg) => { if (msg.token) res.cookie('authToken', msg.token, { maxAge: TOKEN_LIFETIME * 1000 }); }));

app.post('/api/auth', async (req, res) => delegate(req, res, (req, res, msg) => { if (msg.token) res.cookie('authToken', msg.token, { maxAge: TOKEN_LIFETIME * 1000 }); }));

app.post('/api/setReaction', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/publishComment', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getUserNickname', async (req, res) => delegate(req, res));

app.get('/api/getComments', async (req, res) => delegate(req, res));

app.get('/api/getBusinesses', async (req, res) => delegate(req, res));

app.get('/api/getPlan', async (req, res) => delegate(req, res));

app.get('/api/getOwnPlans', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getLikedPlans', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getDislikedPlans', middlewares.bindAuth, async (req, res) => delegate(req, res));

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

fs.readFile('./../TODO', (_, content) => {
    app.listen(port, () => {
        console.log(`Main server listening at :${port}`);
        console.log(chalk.bgYellow.whiteBright.bold(`\nTODO:\n`));
        console.log(chalk.yellowBright(content) + '\n\n');

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
        }

        onServerStart();
    })
});
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');
const middlewares = require('./middlewares');
const cookieParser = require('cookie-parser');
const dbUtils = require('./dbUtils');

app.use(express.json());
app.use(cookieParser());

if (process.env.ENV === 'DEV') app.use(middlewares.bindLogs);
// app.use(middlewares.bindAuth);

const API_ANSWER_DELAY = 1000;
const TOKEN_LIFETIME = 60 * 5;

let businesses = [];
let comments = [];
let user = {};

for (let i = 0; i < 22; i++) {
    comments.push({
        id: uuid.v4(),
        created: 1631638551000,
        text: `test${i}`,
        author: {
            id: uuid.v4(),
            nickname: `user${i}`
        }
    });
}

for (let i = 0; i < 22; i++) {
    let tmp = null;
    if (!i) {
        tmp = uuid.v4();
        user['id'] = tmp;
    }

    businesses.push({
        id: !i ? tmp : uuid.v4(),
        owner: !i ? tmp : uuid.v4(),
        created: 1631638551000,
        editions: [
            {
                id: uuid.v4(),
                content: {
                    name: `name${i}`,
                    description: `desc${i}`,
                    category: 0,
                    type: 0,
                    created: 1631638551000,
                    income: {
                        sum: 100,
                        text: 'test'
                    },
                    expence: {
                        sum: 100,
                        text: 'test expence'
                    },
                    likes: 121,
                    dislikes: 300
                }
            },
            {
                id: uuid.v4(),
                content: {
                    name: `name${i}`,
                    description: `test desc${i}`,
                    category: 0,
                    type: 0,
                    created: 1631638551000,
                    income: {
                        sum: 100,
                        text: 'test'
                    },
                    expence: {
                        sum: 100,
                        text: 'test expence'
                    },
                    likes: 121,
                    dislikes: 300
                }
            }
        ],

    });
}

app.post('/api/checkToken', middlewares.bindAuth, async (req, res) => {
    let answer = await dbUtils.getUserByToken(req.cookies.authToken);
    let [result, fields] = answer;

    setTimeout(() => {
        result.length == 1 ?
            res.send(JSON.stringify({
                success: true,
                id: result[0].user_id
            })) : {};
            // :
            // res.send(JSON.stringify({
            //     success: false,
            //     cause: 'No such user, please check login or password!'
            // }));
    }, API_ANSWER_DELAY);
});

app.post('/api/addUser', async (req, res) => {
    let { id, answer } = await dbUtils.addUser();
    let [result, fields] = answer;

    if (result.affectedRows) {
        let token = await dbUtils.setToken(id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);
        res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });
    }

    setTimeout(() => {
        result.affectedRows ?
            res.send(JSON.stringify({
                success: true,
                id
            })) :
            res.send(JSON.stringify({
                success: false,
                cause: 'Duplicate login or nickname, change it please!'
            }));
    }, API_ANSWER_DELAY);
});

app.post('/api/auth', async (req, res) => {
    let answer = await dbUtils.getUser(req.body);
    let [result, fields] = answer;

    if (result.length == 1) {
        let token = await dbUtils.setToken(result[0]._id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);
        res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });
    }

    setTimeout(() => {
        result.length == 1 ?
            res.send(JSON.stringify({
                success: true,
                id: result[0]._id
            })) :
            res.send(JSON.stringify({
                success: false,
                cause: 'No such user, please check login or password!'
            }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getComments', (req, res) => {
    let analysed = {
        offset: +req.query.offset + +req.query.count
    };

    let min = comments.length < analysed.offset ? comments.length : analysed.offset;

    let ans = comments.slice(+req.query.offset, min);

    analysed['needMore'] = min == ans.length;

    analysed['content'] = ans;

    setTimeout(() => {
        res.send(JSON.stringify(analysed));
    }, API_ANSWER_DELAY);
});

app.get('/api/getBusinesses', (req, res) => {
    let analysed = {
        offset: +req.query.offset + +req.query.count
    };

    let min = businesses.length < analysed.offset ? businesses.length : analysed.offset;

    let ans = businesses.slice(+req.query.offset, min);

    analysed['needMore'] = min == ans.length;

    analysed['content'] = ans;

    setTimeout(() => {
        res.send(JSON.stringify(analysed));
    }, API_ANSWER_DELAY);
});

app.get('/api/getPlan', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify({
            name: `name test`,
            owner: user.id,
            description: `desc for non fetched test`,
            category: 0,
            type: 0,
            created: 1631638551000,
            income: {
                sum: 100,
                text: 'test'
            },
            expence: {
                sum: 100,
                text: 'test expence'
            },
            likes: 121,
            dislikes: 300
        }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getFiltersTypes', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify([
            { id: 0, name: 'Food' },
            { id: 1, name: 'IT' },
        ]));
    }, API_ANSWER_DELAY);
});

app.get('/api/getFiltersCategories', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify([
            { id: 0, name: 'Franchise' },
            { id: 1, name: 'Startup' },
        ]));
    }, API_ANSWER_DELAY);
});

app.get('/api/getOwnPlans', middlewares.bindAuth, (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(businesses));
    }, API_ANSWER_DELAY);
});

app.get('/api/getLikedPlans', middlewares.bindAuth, (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(businesses));
    }, API_ANSWER_DELAY);
});

app.get('/api/getDislikedPlans', middlewares.bindAuth, (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(businesses));
    }, API_ANSWER_DELAY);
});

fs.readFile('./../TODO', (_, content) => {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
        console.log(chalk.bgYellow.whiteBright.bold(`\nTODO:\n`));
        console.log(chalk.yellowBright(content) + '\n\n');
    })
});
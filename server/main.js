const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8888;
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');

app.use(express.json());

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

app.get('/api/getPlan', (req, res) => {
    console.log('asked test');
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
    }, 5000);
});

app.get('/api/getFiltersCategories', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify([
            { id: 0, name: 'Franchise' },
            { id: 1, name: 'Startup' },
        ]));
    }, 5000);
});

app.get('/api/getOwnPlans', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(businesses));
    }, 5000);
});

app.get('/api/getLikedPlans', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(businesses));
    }, 5000);
});

// app.get('/api/getDislikedPlans', (req, res) => {
//     setTimeout(() => {
//         res.send(JSON.stringify(businesses));
//     }, 5000);
// });

app.post('/api/auth', (req, res) => {
    setTimeout(() => {
        res.send(user);
    }, 5000);
});

app.post('/api/checkToken', (req, res) => {
    setTimeout(() => {
        res.send(user);
    }, 5000);
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
    }, 5000);
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
    }, 5000);
});

fs.readFile('./../TODO', (_, content) => {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
        console.log(chalk.bgYellow.whiteBright.bold(`\nTODO:\n`));
        console.log(chalk.yellowBright(content));
    })
});
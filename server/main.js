const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8888;
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');

app.use(express.json());

let businesses = new Array(20).fill({id: uuid.v4(), description: 'kal'});

app.get('/api/getFiltersCategories', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify([
            {id: 0, name: 'Franchise'},
            {id: 1, name: 'Startup'},
        ]));
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
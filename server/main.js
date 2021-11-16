const express = require('express');
const app = express();
if (process.env.ENV !== 'DOCKERDEV') {
  require('dotenv').config();
  console.log('LOADED WITH DOTENV ENV');
} else {
  console.log('LOADED WITH DOCKER_COMPOSE ENV');
}
const port = process.env.PORT || 3001;
const RPC_QUEUE = process.env.RPCQUEUE;
const RABBIT_URL = process.env.RABBITURL;
const fs = require('fs');
const chalk = require('chalk');
const middlewares = require('./middlewares');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

if (process.env.ENV === 'LOCALDEV' || process.env.ENV === 'DOCKERDEV')
  app.use(middlewares.bindLogs);

const API_ANSWER_DELAY = 1000;
const TOKEN_LIFETIME = process.env.TOKENLIFETIME;

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
  let msg = await amqpClient.sendRPCMessage(channel, getReqData(req), RPC_QUEUE);
  msg = JSON.parse(msg);
  if (msg.success && callback) {
    callback(req, res, msg);
  }
  setTimeout(() => {
    res.send(JSON.stringify(msg));
  }, API_ANSWER_DELAY);
}

const amqpClient = require('./services/dataManager/amqpClient');

amqpClient.createClient({ url: RABBIT_URL }).then((ch) => {
  channel = ch;
});

app.post('/api/addUser', async (req, res) =>
  delegate(req, res, (req, res, msg) => {
    if (msg.token) res.cookie('authToken', msg.token, { maxAge: TOKEN_LIFETIME * 1000 });
  })
);

app.post('/api/auth', async (req, res) =>
  delegate(req, res, (req, res, msg) => {
    if (msg.token) res.cookie('authToken', msg.token, { maxAge: TOKEN_LIFETIME * 1000 });
  })
);

app.get('/api/logout', async (req, res) =>
  delegate(req, res, (req, res, msg) => {
    if (msg.dropToken) res.cookie('authToken', '', { maxAge: Date.now() });
  })
);

app.put('/api/updateProfilePassword', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/createPlanEdition', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.put('/api/updateProfileData', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getDislikedPlans', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/publishComment', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/createNewPlan', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getLikedPlans', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/setReaction', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/checkToken', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getOwnPlans', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.post('/api/deletePlan', middlewares.bindAuth, async (req, res) => delegate(req, res));

app.get('/api/getUserNickname', async (req, res) => delegate(req, res));

app.get('/api/getFiltersCategories', (req, res) => delegate(req, res));

app.get('/api/getBusinesses', async (req, res) => delegate(req, res));

app.get('/api/getComments', async (req, res) => delegate(req, res));

app.get('/api/getFiltersTypes', (req, res) => delegate(req, res));

app.get('/api/getPlan', async (req, res) => delegate(req, res));

fs.readFile('./TODO', (_, content) => {
  app.listen(port, () => {
    console.log(`Main server listening at :${port}`);
    console.log(chalk.bgYellow.whiteBright.bold(`\nTODO:\n`));
    console.log(chalk.yellowBright(content) + '\n\n');
  });
});

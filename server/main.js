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
const e = require('express');

app.use(express.json());
app.use(cookieParser());

if (process.env.ENV === 'DEV') app.use(middlewares.bindLogs);
// app.use(middlewares.bindAuth);

const API_ANSWER_DELAY = 1000;
const TOKEN_LIFETIME = 60 * 5;
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
        editions: [
            {
                id: uuid.v4(),
                content: {
                    name: `name${i}`,
                    description: `desc${i}`,
                    category: 1,
                    type: 1,
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
                    category: 1,
                    type: 1,
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

app.post('/api/createPlanEdition', middlewares.bindAuth, async (req, res) => {
    let eId = await dbUtils.createEdition(req.body.data.businessId, req.body);

    if (eId) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot create new edition'
            }));
        }, API_ANSWER_DELAY);
    }
});

app.post('/api/createNewPlan', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length == 1) {
        let bId = await dbUtils.createBusiness(result[0].user_id);

        if (bId) {
            let eId = await dbUtils.createEdition(bId, req.body);

            let sendContent = await dbUtils.getBusinessById(bId);

            if (eId) {
                setTimeout(() => {
                    res.send(JSON.stringify({
                        success: true,
                        data: sendContent
                    }));
                }, API_ANSWER_DELAY);
            } else {
                setTimeout(() => {
                    res.send(JSON.stringify({
                        success: false,
                        cause: 'Something went wrong, we cannot create business for you!'
                    }));
                }, API_ANSWER_DELAY);
            }
        } else {
            setTimeout(() => {
                res.send(JSON.stringify({
                    success: false,
                    cause: 'Something went wrong, we cannot create business for you!'
                }));
            }, API_ANSWER_DELAY);
        }
    } else {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Something went wrong, we do not know yoy, looo-o-ol!'
            }));
        }, API_ANSWER_DELAY);
    }
});

app.get('/api/logout', async (req, res) => {
    let [result, fields] = req.cookies.authToken ? await dbUtils.getUserByToken(req.cookies.authToken) : [null, null];

    if (result?.length == 1) {
        dbUtils.dropToken(result[0].body);
        res.cookie('authToken', '', { maxAge: Date.now() });
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                // cause: 'Something went wrong, we do not know yoy, looo-o-ol!'
            }));
        }, API_ANSWER_DELAY);
    }
});

app.put('/api/updateProfilePassword', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length != 1) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Something went wrong, we do not know yoy, looo-o-ol!'
            }));
        }, API_ANSWER_DELAY);
    } else {
        let [answer, moreInfo] = await dbUtils.updatePassword(result[0].user_id, req.body.oldPassword, req.body.password);
        if (answer.affectedRows == 1) {
            res.send(JSON.stringify({
                success: true
            }));
        } else {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot update password!'
            }));
        }
    }
});

app.put('/api/updateProfileData', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length != 1) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Something went wrong, we do not know yoy, looo-o-ol!'
            }));
        }, API_ANSWER_DELAY);
    } else {
        let [answer, moreInfo] = await dbUtils.updateNickname(result[0].user_id, req.body.nickname);
        if (answer.affectedRows == 1) {
            res.send(JSON.stringify({
                success: true,
                nickname: req.body.nickname
            }));
        } else {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot update nickname!'
            }));
        }
    }
});

app.post('/api/checkToken', middlewares.bindAuth, async (req, res) => {
    let answer = await dbUtils.getUserByToken(req.cookies.authToken);
    let [result, fields] = answer;

    setTimeout(() => {
        result.length == 1 ?
            res.send(JSON.stringify({
                success: true,
                id: result[0]._id,
                login: result[0].login,
                nickname: result[0].nickname
            })) :
            {};
    }, API_ANSWER_DELAY);
});

app.post('/api/deletePlan', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length !== 1) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Something went wrong, we do not know yoy, looo-o-ol!'
            }));
        }, API_ANSWER_DELAY);
        return;
    }

    let [owner, _d] = await dbUtils.getBusinessOwner(req.body.bId);

    if (owner[0].user_id !== result[0].user_id) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'This is not your business!'
            }));
        }, API_ANSWER_DELAY);
    }

    let [deleted, _] = await dbUtils.deletePlan(req.body.bId);

    console.log(deleted)

    if (deleted.affectedRows !== 1) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Something went wrong!'
            }));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
        }));
    }, API_ANSWER_DELAY);
});

app.post('/api/addUser', async (req, res) => {
    let { id, answer, login, nickname } = await dbUtils.addUser(req.body);
    let [result, fields] = answer;

    if (result.affectedRows) {
        let token = await dbUtils.setToken(id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);
        res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });
    }

    setTimeout(() => {
        result.affectedRows ?
            res.send(JSON.stringify({
                success: true,
                id,
                login,
                nickname
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
                id: result[0]._id,
                login: result[0].login,
                nickname: result[0].nickname
            })) :
            res.send(JSON.stringify({
                success: false,
                cause: 'No such user, please check login or password!'
            }));
    }, API_ANSWER_DELAY);
});

app.post('/api/setReaction', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length !== 1) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot set reaction, we cannot auth you!'
            }));
        }, API_ANSWER_DELAY);
        return;
    }

    let answer = null;

    switch (req.body.reaction) {
        case 'like': {
            answer = await dbUtils.createLike(req.body, result[0]._id);
            break;
        }

        case 'dislike': {
            answer = await dbUtils.createDislike(req.body, result[0]._id);
            break;
        }

        case 'dropLike': {
            answer = await dbUtils.dropLike(req.body, result[0]._id);
            break;
        }

        case 'dropDislike': {
            answer = await dbUtils.dropDislike(req.body, result[0]._id);
            break;
        }
    }

    if (!answer) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot set reaction, something went wrong!'
            }));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
            type: req.body.reaction
        }));
    }, API_ANSWER_DELAY);
});

app.post('/api/publishComment', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length == 1) {
        let comment = await dbUtils.createComment(req.body, result[0]._id);
        comment = Object.assign({}, comment, {
            author: {
                id: result[0]._id,
                nickname: result[0].nickname
            }
        });
        if (comment) {
            setTimeout(() => {
                res.send(JSON.stringify({
                    success: true,
                    comment
                }));
            }, API_ANSWER_DELAY);
        } else {
            setTimeout(() => {
                res.send(JSON.stringify({
                    success: false,
                    cause: 'Cannot create comment, try later!'
                }));
            }, API_ANSWER_DELAY);
        }
    } else {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot create comment, we cannot auth you!'
            }));
        }, API_ANSWER_DELAY);
    }
});

app.get('/api/getUserNickname', async (req, res) => {
    let [result, fields] = await dbUtils.getUserNickname(req.query.id);

    setTimeout(() => {
        result.length == 1 ?
            res.send(JSON.stringify({
                success: true,
                nickname: result[0].nickname
            })) :
            res.send(JSON.stringify({
                success: false,
                cause: 'No such user, cannot get nickname!'
            }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getComments', async (req, res) => {
    let analysed = {
        offset: +req.query.offset + +req.query.count
    };

    // let min = comments.length < analysed.offset ? comments.length : analysed.offset;

    // let ans = comments.slice(+req.query.offset, min);

    let ans = await dbUtils.getComments(req.query);

    analysed['needMore'] = req.query.count == ans.length;

    analysed['content'] = ans;

    if (ans) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                comments: analysed
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'No more comments right now!'
            }));
        }, API_ANSWER_DELAY);
    }

});

app.get('/api/getBusinesses', async (req, res) => {
    let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

    let analysed = {
        offset: +req.query.offset + +req.query.count
    };

    // let min = businesses.length < analysed.offset ? businesses.length : analysed.offset;

    // let ans = businesses.slice(+req.query.offset, min);

    let ans = await dbUtils.getBusinessesWithFilters(req.query, req.cookies.authToken && user[0]._id);

    analysed['needMore'] = req.query.count == ans.length;

    analysed['content'] = ans;

    console.log(JSON.stringify(analysed))

    setTimeout(() => {
        res.send(JSON.stringify(analysed));
    }, API_ANSWER_DELAY);
});

app.get('/api/getPlan', async (req, res) => {

    let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

    // if (user.length !== 1) {
    //     setTimeout(() => {
    //         res.send(JSON.stringify({
    //             success: false,
    //             cause: 'Cannot set reaction, we cannot auth you!'
    //         }));
    //     }, API_ANSWER_DELAY);
    //     return;
    // }

    let result = await dbUtils.getPlan(req.query.planId, req.query.edId, user[0]?._id || '');

    let editions = await dbUtils.getAllBusinessEditions(req.query.planId); // return only common values for versions select in plan view

    result = Object.assign({}, result, { editions: editions })

    console.log(result)

    if (Object.keys(result).length) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                plan: { ...result }
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: false,
                cause: 'Cannot get such business plan'
            }));
        }, API_ANSWER_DELAY);
    }

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

app.get('/api/getOwnPlans', middlewares.bindAuth, async (req, res) => {
    let businesses = await dbUtils.getOwnerBusinesses(req.query.userId);
    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
            businesses
        }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getLikedPlans', middlewares.bindAuth, async (req, res) => {
    let businesses = await dbUtils.getOwnerLikedBusinesses(req.query.userId);
    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
            businesses
        }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getDislikedPlans', middlewares.bindAuth, async (req, res) => {
    let businesses = await dbUtils.getOwnerDislikedBusinesses(req.query.userId);
    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
            businesses
        }));
    }, API_ANSWER_DELAY);
});

fs.readFile('./../TODO', (_, content) => {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
        console.log(chalk.bgYellow.whiteBright.bold(`\nTODO:\n`));
        console.log(chalk.yellowBright(content) + '\n\n');

        function onServerStart() {
            dbUtils.initTypes(TYPES);
            dbUtils.initCategories(CATEGORIES);
        }

        onServerStart();
    })
});
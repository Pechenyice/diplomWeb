const express = require('express');
const app = express();
if (process.env.ENV !== 'DOCKERDEV') {
    require('dotenv').config();
} else {
    console.log("LOADED WITH DOCKER_COMPOSE ENV")
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

app.post('/api/createPlanEdition', middlewares.bindAuth, async (req, res) => {
    let eId = await dbUtils.createEdition(req.body.data.businessId, req.body);

    if (!eId) {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot create new edition!'));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
        }));
    }, API_ANSWER_DELAY);
});

app.post('/api/createNewPlan', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let bId = await dbUtils.createBusiness(result[0].user_id);

    if (!bId) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we cannot create business for you!'));
        }, API_ANSWER_DELAY);
        return;
    }

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
            res.send(arrangeAbort('Something went wrong, we cannot create business for you!'));
        }, API_ANSWER_DELAY);
    }
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

app.put('/api/updateProfilePassword', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (!result) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
        }, API_ANSWER_DELAY);
        return;
    }

    if (result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let [answer, _] = await dbUtils.updatePassword(result[0].user_id, req.body.oldPassword, req.body.password);

    if (!answer) setTimeout(() => {
        res.send(arrangeAbort('Cannot update password!'));
        return;
    }, API_ANSWER_DELAY);


    if (answer.affectedRows == 1) {
        res.send(JSON.stringify({
            success: true
        }));
    } else {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot update password!'));
        }, API_ANSWER_DELAY);
    }

});

app.put('/api/updateProfileData', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (!result || result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let [answer, moreInfo] = await dbUtils.updateNickname(result[0].user_id, req.body.nickname);

    if (!answer) {
        res.send(arrangeAbort('Cannot update nickname!'));
        return;
    }

    if (answer.affectedRows == 1) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                nickname: req.body.nickname
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot update nickname!'));
        }, API_ANSWER_DELAY);
    }
});

app.post('/api/checkToken', middlewares.bindAuth, async (req, res) => {
    let answer = await dbUtils.getUserByToken(req.cookies.authToken);
    let [result, fields] = answer;

    if (!result || result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort(''));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
            id: result[0]._id,
            login: result[0].login,
            nickname: result[0].nickname
        }));
    }, API_ANSWER_DELAY);
});

app.post('/api/deletePlan', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (!result || result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let [owner, _d] = await dbUtils.getBusinessOwner(req.body.bId);

    if (!owner || owner[0].user_id !== result[0].user_id) {
        setTimeout(() => {
            res.send(arrangeAbort('This is not your business!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let [deleted, _] = await dbUtils.deletePlan(req.body.bId);

    if (!deleted || deleted.affectedRows !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
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

app.post('/api/setReaction', middlewares.bindAuth, async (req, res) => {
    let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

    if (!result || result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot set reaction, we cannot auth you!'));
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
            res.send(arrangeAbort('Cannot set reaction, something went wrong!'));
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

    if (!result || result.length !== 1) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
        }, API_ANSWER_DELAY);
        return;
    }

    let comment = await dbUtils.createComment(req.body, result[0]._id);

    if (comment) {
        comment = Object.assign({}, comment, {
            author: {
                id: result[0]._id,
                nickname: result[0].nickname
            }
        });
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                comment
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot create comment, try later!'));
        }, API_ANSWER_DELAY);
    }
});

app.get('/api/getUserNickname', async (req, res) => {
    let [result, fields] = await dbUtils.getUserNickname(req.query.id);

    if (!result) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        result.length == 1 ?
            res.send(JSON.stringify({
                success: true,
                nickname: result[0].nickname
            })) :
            res.send(arrangeAbort('No such user, cannot get nickname!'));
    }, API_ANSWER_DELAY);
});

app.get('/api/getComments', async (req, res) => {
    let analysed = {
        offset: +req.query.offset + +req.query.count
    };

    // let min = comments.length < analysed.offset ? comments.length : analysed.offset;

    // let ans = comments.slice(+req.query.offset, min);

    let ans = await dbUtils.getComments(req.query);

    if (!ans) {
        setTimeout(() => {
            res.send(arrangeAbort('No more comments right now!'));
        }, API_ANSWER_DELAY);
        return;
    }

    analysed['needMore'] = req.query.count == ans.length;

    analysed['content'] = ans;

    setTimeout(() => {
        res.send(JSON.stringify({
            success: true,
            comments: analysed
        }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getBusinesses', async (req, res) => {
    let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

    let analysed = {
        offset: +req.query.offset + +req.query.count
    };

    // let min = businesses.length < analysed.offset ? businesses.length : analysed.offset;

    // let ans = businesses.slice(+req.query.offset, min);

    let ans = await dbUtils.getBusinessesWithFilters(req.query, req.cookies.authToken && user[0]._id);

    if (!ans) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    analysed['needMore'] = req.query.count == ans.length;

    analysed['content'] = ans;

    analysed['success'] = true;

    setTimeout(() => {
        res.send(JSON.stringify(analysed));
    }, API_ANSWER_DELAY);
});

app.get('/api/getPlan', async (req, res) => {

    let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

    let result = await dbUtils.getPlan(req.query.planId, req.query.edId, user[0]?._id || '');

    let editions = await dbUtils.getAllBusinessEditions(req.query.planId); // return only common values for versions select in plan view

    if (!result || !editions) {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot get such business plan!'));
        }, API_ANSWER_DELAY);
        return;
    }

    result = Object.assign({}, result, { editions: editions })

    if (Object.keys(result).length) {
        setTimeout(() => {
            res.send(JSON.stringify({
                success: true,
                plan: { ...result }
            }));
        }, API_ANSWER_DELAY);
    } else {
        setTimeout(() => {
            res.send(arrangeAbort('Cannot get such business plan!'));
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
    console.log('businesses own ', businesses);
    if (businesses == null) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        console.log('businesses', businesses);
        res.send(JSON.stringify({
            success: true,
            businesses
        }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getLikedPlans', middlewares.bindAuth, async (req, res) => {
    let businesses = await dbUtils.getOwnerLikedBusinesses(req.query.userId);
    console.log('businesses liked ', businesses);
    if (businesses == null) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        console.log('businesses', businesses);
        res.send(JSON.stringify({
            success: true,
            businesses
        }));
    }, API_ANSWER_DELAY);
});

app.get('/api/getDislikedPlans', middlewares.bindAuth, async (req, res) => {
    let businesses = await dbUtils.getOwnerDislikedBusinesses(req.query.userId);
    console.log('businesses disliked ', businesses);
    if (businesses == null) {
        setTimeout(() => {
            res.send(arrangeAbort('Something went wrong!'));
        }, API_ANSWER_DELAY);
        return;
    }

    setTimeout(() => {
        console.log('businesses', businesses);
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
'use strict';
if (process.env.ENV !== 'DOCKERDEV') {
    require('dotenv').config();
    console.log("LOADED WITH DOTENV ENV");
} else {
    console.log("LOADED WITH DOCKER_COMPOSE ENV");
}
const TOKEN_LIFETIME = process.env.TOKENLIFETIME;
const amqp = require('amqplib');
const dbUtils = require('./dbUtils');

const q = 'rpc_queue';
amqp.connect('amqp://localhost:5672')
    .then(conn => {
        return conn.createChannel();
    })
    .then(ch => {
        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [x] Awaiting RPC Requests");
        ch.consume(q, async (msg) => {

            const n = JSON.parse(msg.content.toString());

            console.log("got request: ", n.path);
            let analyzed = await analyzer(n);
            console.log("sended response: ", analyzed);
            console.log();
            if (!analyzed) {
                ch.ack(msg);
                return;
            }
            ch.sendToQueue(msg.properties.replyTo,
                Buffer.from(analyzed),
                { correlationId: msg.properties.correlationId });
            ch.ack(msg);
        })
    });

function arrangeAbort(cause) {
    return JSON.stringify({
        success: false,
        cause
    });
}

async function analyzer(req) {
    req.path = req.path.split('?')[0];
    switch (req.path) {
        case '/api/checkToken': {
            let answer = await dbUtils.getUserByToken(req.cookies.authToken);
            let [result, fields] = answer;
            if (!result || result.length !== 1) {
                return arrangeAbort('');
            }

            return JSON.stringify({
                success: true,
                id: result[0]._id,
                login: result[0].login,
                nickname: result[0].nickname
            });
        }

        case '/api/createPlanEdition': {
            let eId = await dbUtils.createEdition(req.body.data.businessId, req.body);

            if (!eId) {
                return arrangeAbort('Cannot create new edition!');
            }

            return JSON.stringify({
                success: true,
            });
        }

        case '/api/createNewPlan': {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

            if (result.length !== 1) {
                return arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!');
            }

            let bId = await dbUtils.createBusiness(result[0].user_id);

            if (!bId) {
                return arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!');
            }

            let eId = await dbUtils.createEdition(bId, req.body);

            let sendContent = await dbUtils.getBusinessById(bId);

            if (eId) {
                return JSON.stringify({
                    success: true,
                    data: sendContent
                });
            } else {
                return arrangeAbort('Something went wrong, we cannot create business for you!');
            }
        }

        case '/api/logout': {
            let [result, fields] = req.cookies.authToken ? await dbUtils.getUserByToken(req.cookies.authToken) : [null, null];

            if (result?.length === 1) {
                dbUtils.dropToken(result[0].body);

                // analog
                // res.cookie('authToken', '', { maxAge: Date.now() });
                return JSON.stringify({
                    success: true,
                    dropToken: true
                });
            }

            return JSON.stringify({
                success: true,
                dropToken: false
            });
        }

        case '/api/updateProfilePassword': {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

            if (!result || result.length !== 1) {
                return arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!');
            }

            let [answer, _] = await dbUtils.updatePassword(result[0].user_id, req.body.oldPassword, req.body.password);

            if (!answer) return arrangeAbort('Cannot update password!');


            if (answer.affectedRows == 1) {
                return JSON.stringify({
                    success: true
                });
            } else {
                return arrangeAbort('Cannot update password!');
            }
        }

        case '/api/updateProfileData': {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

            if (!result || result.length !== 1) {
                return arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!');
            }

            let [answer, moreInfo] = await dbUtils.updateNickname(result[0].user_id, req.body.nickname);

            if (!answer) {
                return arrangeAbort('Cannot update nickname!');
            }

            if (answer.affectedRows == 1) {
                return JSON.stringify({
                    success: true,
                    nickname: req.body.nickname
                });
            } else {
                return arrangeAbort('Cannot update nickname!');
            }
        }

        case '/api/deletePlan': {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

            if (!result || result.length !== 1) {
                return arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!');
            }

            let [owner, _d] = await dbUtils.getBusinessOwner(req.body.bId);

            if (!owner || owner[0].user_id !== result[0].user_id) {
                return arrangeAbort('This is not your business!');
            }

            let [deleted, _] = await dbUtils.deletePlan(req.body.bId);

            if (!deleted || deleted.affectedRows !== 1) {
                return arrangeAbort('Something went wrong!');
            }

            return JSON.stringify({
                success: true,
            });
        }

        case '/api/addUser': {
            let { id, answer, login, nickname } = await dbUtils.addUser(req.body);

            if (!answer) {
                return arrangeAbort('Something went wrong!');
            }

            let [result, fields] = answer;

            if (result.affectedRows) {
                let token = await dbUtils.setToken(id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);

                // analog
                // res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });
                return JSON.stringify({
                    success: true,
                    id,
                    login,
                    nickname,
                    token
                });
            }

            return arrangeAbort('Duplicate login or nickname, change it please!');
        }

        case '/api/auth': {
            let [result, fields] = await dbUtils.getUser(req.body);

            if (!result) {
                return arrangeAbort('Something went wrong!');
            }

            if (result.length == 1) {
                let token = await dbUtils.setToken(result[0]._id, Date.now() + TOKEN_LIFETIME * 1000, req.ip);

                //analog
                // res.cookie('authToken', token, { maxAge: TOKEN_LIFETIME * 1000 });
                return JSON.stringify({
                    success: true,
                    id: result[0]._id,
                    login: result[0].login,
                    nickname: result[0].nickname,
                    token
                });
            }

            return arrangeAbort('No such user, please check login or password!');
        }

        case '/api/setReaction': {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

            if (!result || result.length !== 1) {
                return arrangeAbort('Cannot set reaction, we cannot auth you!');
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
                return arrangeAbort('Cannot set reaction, something went wrong!');
            }

            return JSON.stringify({
                success: true,
                type: req.body.reaction
            });
        }

        case '/api/publishComment': {
            let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

            if (!result || result.length !== 1) {
                return arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!');
            }

            let comment = await dbUtils.createComment(req.body, result[0]._id);

            if (comment) {
                comment = Object.assign({}, comment, {
                    author: {
                        id: result[0]._id,
                        nickname: result[0].nickname
                    }
                });
                return JSON.stringify({
                    success: true,
                    comment
                });
            } else {
                return arrangeAbort('Cannot create comment, try later!');
            }
        }

        case '/api/getUserNickname': {
            let [result, fields] = await dbUtils.getUserNickname(req.query.id);

            if (!result) {
                return arrangeAbort('Something went wrong!');
            }

            return result.length == 1 ?
                JSON.stringify({
                    success: true,
                    nickname: result[0].nickname
                }) :
                arrangeAbort('No such user, cannot get nickname!');

        }

        case '/api/getComments': {
            let analysed = {
                offset: +req.query.offset + +req.query.count
            };

            let ans = await dbUtils.getComments(req.query);

            if (!ans) {
                return arrangeAbort('No more comments right now!');
            }

            analysed['needMore'] = req.query.count == ans.length;

            analysed['content'] = ans;

            return JSON.stringify({
                success: true,
                comments: analysed
            });
        }

        case '/api/getBusinesses': {
            let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

            let analysed = {
                offset: +req.query.offset + +req.query.count
            };

            let ans = await dbUtils.getBusinessesWithFilters(req.query, req.cookies.authToken && user[0]._id);

            if (!ans) {
                return arrangeAbort('Something went wrong!');
            }

            analysed['needMore'] = req.query.count == ans.length;

            analysed['content'] = ans;

            analysed['success'] = true;

            return JSON.stringify(analysed);
        }

        case '/api/getPlan': {
            let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

            let result = await dbUtils.getPlan(req.query.planId, req.query.edId, user[0]?._id || '');

            let editions = await dbUtils.getAllBusinessEditions(req.query.planId); // return only common values for versions select in plan view

            if (!result || !editions) {
                return arrangeAbort('Cannot get such business plan!');
            }

            result = Object.assign({}, result, { editions: editions })

            if (Object.keys(result).length) {
                return JSON.stringify({
                    success: true,
                    plan: { ...result }
                });
            } else {
                return arrangeAbort('Cannot get such business plan!');
            }
        }

        case '/api/getOwnPlans': {
            let businesses = await dbUtils.getOwnerBusinesses(req.query.userId);
            if (businesses == null) {
                return arrangeAbort('Something went wrong!');
            }
            return JSON.stringify({
                success: true,
                businesses: businesses
            });
        }

        case '/api/getLikedPlans': {
            let businesses = await dbUtils.getOwnerLikedBusinesses(req.query.userId);
            if (businesses == null) {
                return arrangeAbort('Something went wrong!');
            }

            return JSON.stringify({
                success: true,
                businesses: businesses
            });
        }

        case '/api/getDislikedPlans': {
            let businesses = await dbUtils.getOwnerDislikedBusinesses(req.query.userId);
            if (businesses == null) {
                return arrangeAbort('Something went wrong!');
            }

            return JSON.stringify({
                success: true,
                businesses: businesses
            });
        }
    }
} 

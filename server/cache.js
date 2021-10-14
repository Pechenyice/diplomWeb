const MicroMQ = require('micromq');
const dbUtils = require('./dbUtils');

const API_ANSWER_DELAY = process.env.RESPONSEDELAY;
const TOKEN_LIFETIME = process.env.TOKENLIFETIME;

const app = new MicroMQ({
  name: 'cache',
  rabbit: {
    url: process.env.RABBITURL,
  },
});

function arrangeAbort(cause) {
  return JSON.stringify({
      success: false,
      cause
  });
}

app.post('/api/checkToken', async (req, res) => {
  let answer = await dbUtils.getUserByToken(req.cookies.authToken);
  let [result, fields] = answer;

  if (!result || result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort(''));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
          id: result[0]._id,
          login: result[0].login,
          nickname: result[0].nickname
      }));
  }, API_ANSWER_DELAY);
});

app.post('/api/createPlanEdition', async (req, res) => {
  let eId = await dbUtils.createEdition(req.body.data.businessId, req.body);

  if (!eId) {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot create new edition!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
      }));
  }, API_ANSWER_DELAY);
});

app.post('/api/createNewPlan', async (req, res) => {
  let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

  if (result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
      }, API_ANSWER_DELAY);
      return;
  }

  let bId = await dbUtils.createBusiness(result[0].user_id);

  if (!bId) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we cannot create business for you!'));
      }, API_ANSWER_DELAY);
      return;
  }

  let eId = await dbUtils.createEdition(bId, req.body);

  let sendContent = await dbUtils.getBusinessById(bId);

  if (eId) {
      setTimeout(() => {
          res.json(JSON.stringify({
              success: true,
              data: sendContent
          }));
      }, API_ANSWER_DELAY);
  } else {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we cannot create business for you!'));
      }, API_ANSWER_DELAY);
  }
});

app.put('/api/updateProfilePassword', async (req, res) => {
  let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

  if (!result) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
      }, API_ANSWER_DELAY);
      return;
  }

  if (result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
      }, API_ANSWER_DELAY);
      return;
  }

  let [answer, _] = await dbUtils.updatePassword(result[0].user_id, req.body.oldPassword, req.body.password);

  if (!answer) setTimeout(() => {
      res.json(arrangeAbort('Cannot update password!'));
      return;
  }, API_ANSWER_DELAY);


  if (answer.affectedRows == 1) {
      res.json(JSON.stringify({
          success: true
      }));
  } else {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot update password!'));
      }, API_ANSWER_DELAY);
  }
});

app.put('/api/updateProfileData', async (req, res) => {
  let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

  if (!result || result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
      }, API_ANSWER_DELAY);
      return;
  }

  let [answer, moreInfo] = await dbUtils.updateNickname(result[0].user_id, req.body.nickname);

  if (!answer) {
      res.json(arrangeAbort('Cannot update nickname!'));
      return;
  }

  if (answer.affectedRows == 1) {
      setTimeout(() => {
          res.json(JSON.stringify({
              success: true,
              nickname: req.body.nickname
          }));
      }, API_ANSWER_DELAY);
  } else {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot update nickname!'));
      }, API_ANSWER_DELAY);
  }
});

app.post('/api/deletePlan', async (req, res) => {
  let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

  if (!result || result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
      }, API_ANSWER_DELAY);
      return;
  }

  let [owner, _d] = await dbUtils.getBusinessOwner(req.body.bId);

  if (!owner || owner[0].user_id !== result[0].user_id) {
      setTimeout(() => {
          res.json(arrangeAbort('This is not your business!'));
      }, API_ANSWER_DELAY);
      return;
  }

  let [deleted, _] = await dbUtils.deletePlan(req.body.bId);

  if (!deleted || deleted.affectedRows !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
      }));
  }, API_ANSWER_DELAY);
});

app.post('/api/setReaction', async (req, res) => {
  let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

  if (!result || result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot set reaction, we cannot auth you!'));
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
          res.json(arrangeAbort('Cannot set reaction, something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
          type: req.body.reaction
      }));
  }, API_ANSWER_DELAY);
});

app.post('/api/publishComment', async (req, res) => {
  let [result, fields] = await dbUtils.getUserByToken(req.cookies.authToken);

  if (!result || result.length !== 1) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong, we do not know yoy, looo-o-ol!'));
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
          res.json(JSON.stringify({
              success: true,
              comment
          }));
      }, API_ANSWER_DELAY);
  } else {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot create comment, try later!'));
      }, API_ANSWER_DELAY);
  }
});

app.get('/api/getUserNickname', async (req, res) => {
  let [result, fields] = await dbUtils.getUserNickname(req.query.id);

  if (!result) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      result.length == 1 ?
          res.json(JSON.stringify({
              success: true,
              nickname: result[0].nickname
          })) :
          res.json(arrangeAbort('No such user, cannot get nickname!'));
  }, API_ANSWER_DELAY);
});

app.get('/api/getComments', async (req, res) => {
  let analysed = {
      offset: +req.query.offset + +req.query.count
  };

  let ans = await dbUtils.getComments(req.query);

  if (!ans) {
      setTimeout(() => {
          res.json(arrangeAbort('No more comments right now!'));
      }, API_ANSWER_DELAY);
      return;
  }

  analysed['needMore'] = req.query.count == ans.length;

  analysed['content'] = ans;

  setTimeout(() => {
      res.json(JSON.stringify({
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

  let ans = await dbUtils.getBusinessesWithFilters(req.query, req.cookies.authToken && user[0]._id);

  if (!ans) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  analysed['needMore'] = req.query.count == ans.length;

  analysed['content'] = ans;

  analysed['success'] = true;

  setTimeout(() => {
      res.json(JSON.stringify(analysed));
  }, API_ANSWER_DELAY);
});

app.get('/api/getPlan', async (req, res) => {
  let [user, _] = await dbUtils.getUserByToken(req.cookies.authToken || '');

  let result = await dbUtils.getPlan(req.query.planId, req.query.edId, user[0]?._id || '');

  let editions = await dbUtils.getAllBusinessEditions(req.query.planId); // return only common values for versions select in plan view

  if (!result || !editions) {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot get such business plan!'));
      }, API_ANSWER_DELAY);
      return;
  }

  result = Object.assign({}, result, { editions: editions })

  if (Object.keys(result).length) {
      setTimeout(() => {
          res.json(JSON.stringify({
              success: true,
              plan: { ...result }
          }));
      }, API_ANSWER_DELAY);
  } else {
      setTimeout(() => {
          res.json(arrangeAbort('Cannot get such business plan!'));
      }, API_ANSWER_DELAY);
  }
});

app.get('/api/getOwnPlans', async (req, res) => {
  let businesses = await dbUtils.getOwnerBusinesses(req.query.userId);
  if (businesses == null) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
          businesses
      }));
  }, API_ANSWER_DELAY);
});

app.get('/api/getLikedPlans', async (req, res) => {
  let businesses = await dbUtils.getOwnerLikedBusinesses(req.query.userId);
  if (businesses == null) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
          businesses
      }));
  }, API_ANSWER_DELAY);
});

app.get('/api/getDislikedPlans', async (req, res) => {
  let businesses = await dbUtils.getOwnerDislikedBusinesses(req.query.userId);
  if (businesses == null) {
      setTimeout(() => {
          res.json(arrangeAbort('Something went wrong!'));
      }, API_ANSWER_DELAY);
      return;
  }

  setTimeout(() => {
      res.json(JSON.stringify({
          success: true,
          businesses
      }));
  }, API_ANSWER_DELAY);
});

app.start();
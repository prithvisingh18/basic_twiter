var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

const _ = require('lodash');

var dbInt = require('../models/dbInterface');


router.get("/", function (req, res) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  res.render(global.__frontend);
});

// Register
router.post('/register', async function (req, res, next) {
  let response = { err: null, details: 'User Registered' };
  try {
    let pid = uuidv5(req.body.username, global.__config["NAMESPACE"]);
    await dbInt.registerUser(pid, req.body.username, req.body.password);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      response.err = 'DUP_USER';
      response.details = 'User already exists';
    }
    console.log(err);
  }
  res.send(response);
});

//Login
router.post('/login', async function (req, res, next) {
  let response = { err: null, details: 'User Login Successfull' };
  let login_res;
  let sess = req.session;
  try {
    login_res = await dbInt.loginUser(req.body.username, req.body.password);
  } catch (err) {
    response.err = 'ERR';
    response.details = 'Error While Login';
    console.log(err);
  }
  if (login_res["login"]) {
    sess.session_id = uuidv1();
    sess.username = req.body.username;
    sess.userId = login_res["data"]["pid"];
    console.log(login_res);
    res.send(response);
  } else {
    response.err = "Login failed";
    response.details = "Wrong password or username";
    res.send(response);
  }
});

let checkLogin = async (req) => {
  if (req.session["userId"]) {
    try {
      login_res = await dbInt.checkUser(req.session["userId"]);
      if (login_res) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
};

//Check Login
router.post('/loggedIn', async function (req, res, next) {
  let response = { err: null, details: 'You are logged in.' };
  let isLoggedIn = await checkLogin(req);
  if (isLoggedIn) {
    res.send(response);
  } else {
    res.send({ err: "Not logged in" });
  }

});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });

});

router.post('/follow', async function (req, res) {
  let response = { err: null, details: "Followed" };
  if (req.session.session_id) {
    try {
      await dbInt.followUser(req.body.followed, req.session.username);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        response.err = "DUP_FOLLOW";
        response.details = "Already Followed";
      } else {
        response.err = "DB_ERR";
        response.details = "Follow Failed";
        console.log(err);
      }
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
  }
  res.send(response);
});

router.post('/unfollow', async function (req, res) {
  let response = { err: null, details: "Unfollowed" };
  if (req.session.session_id) {
    try {
      await dbInt.unFollowUser(req.body.followed, req.session.username);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Unfollow Failed";
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
  }
  res.send(response);
});

router.post('/tweet/create', async function (req, res) {
  let response = { err: null, details: "Tweet Successfull" };
  if (checkLogin(req)) {
    try {
      let rid = null;
      if (req.body.rid) {
        rid = req.body.rid;
      }
      await dbInt.createTweet(req.session.username, req.session.userId, req.body.tweet, req.body.hashTags, rid);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Tweet Failed";
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
  }
  res.send(response);
});

router.post('/tweet/delete', async function (req, res) {
  let response = { err: null, details: "Tweet Deleted" };
  if (req.session.session_id) {
    try {
      await dbInt.deleteTweet(req.body.id);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Delete Failed";
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
  }
  res.send(response);
});

router.get('/tweet/get', async function (req, res) {
  let response = { err: null, details: "Tweet Successfull", data: {} };
  if (req.session.session_id) {
    var tweets;
    try {
      tweets = await dbInt.getTweet(req.session.username);
      response.data = tweets.map((x) => x);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Tweet Failed";
      response.data = null;
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
    response.data = null;
  }
  res.send(response);
});

router.post('/tweet/like', async function (req, res) {
  let response = { err: null, details: "Tweet Liked", data: {} };
  if (req.session.session_id) {
    var tweets;
    try {
      await dbInt.like(req.body.tweet_op_id, req.session.username);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Like Failed";
      response.data = null;
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
    response.data = null;
  }
  res.send(response);
});

router.post('/tweet/unlike', async function (req, res) {
  let response = { err: null, details: "Tweet Unliked", data: {} };
  if (req.session.session_id) {
    var tweets;
    try {
      await dbInt.unlike(req.body.tweet_op_id, req.session.username);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Unlike Failed";
      response.data = null;
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
    response.data = null;
  }
  res.send(response);
});

router.post('/tweet/retweet', async function (req, res) {
  let response = { err: null, details: "Retweet Success", data: {} };
  if (req.session.session_id) {
    var tweets;
    try {
      await dbInt.retweet(req.body.tweet_op_id, req.session.username);
    } catch (err) {
      response.err = "DB_ERR";
      response.details = "Retweet Failed";
      response.data = null;
      console.log(err);
    }
  } else {
    response.err = "SESSION_ERR";
    response.details = "Login First"
    response.data = null;
  }
  res.send(response);
});

router.post('/global/feed', async function (req, res) {
  let response = { err: null, details: "Feed", data: {} };
  try {
    response["data"]["tweets"] = await dbInt.getGlobalFeed(req.body.lowerLimit, req.body.upperLimit);
  } catch (err) {
    response.err = "DB_ERR";
    response.details = "Getting Feed Failed";
    response.data = null;
    console.log(err);
  }
  res.send(response);
});

module.exports = router;

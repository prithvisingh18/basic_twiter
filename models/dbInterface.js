const bcrypt = require('bcrypt');
const config = require('../config');
const uuidv5 = require('uuid/v5');
const uuidv1 = require('uuid/v1');

const saltRounds = config.saltRounds;


exports.registerUser = function (username, password) {
    return new Promise(async (resolve, reject) => {
        let password_hash = await bcrypt.hash(password, saltRounds);
        let sql = `insert into ${config.schema}.user (username, password) values ('${username}', '${password_hash}')`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}


exports.followUser = function (followed, follower) {
    return new Promise(async (resolve, reject) => {
        let id = uuidv5(followed + follower, config.NAMESPACE);
        let sql = `insert into ${config.schema}.follow (followed, follower, operation_id) values ('${followed}', '${follower}', '${id}')`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.unFollowUser = function (followed, follower) {
    return new Promise(async (resolve, reject) => {
        let sql = `delete from ${config.schema}.follow where followed='${followed}' and follower='${follower}'`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}


exports.loginUser = function (username, password) {
    return new Promise(async (resolve, reject) => {
        let sql = `select password from ${config.schema}.user where username='${username}'`;
        con.query(sql, async (err, results) => {
            if (err) reject(err);
            if (results.length < 1) {
                resolve(false);
            } else {
                let res = await bcrypt.compare(password, results[0].password);
                resolve(res);
            }
        });
    });
}

exports.createTweet = function (username, tweet) {
    return new Promise(async (resolve, reject) => {
        let id = uuidv5(username + tweet + uuidv1(), config.NAMESPACE);
        let sql = `insert into ${config.schema}.tweets (operation_id, tweet, username) values ('${id}', '${tweet}', '${username}')`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}


exports.getTweet = function (username) {
    return new Promise(async (resolve, reject) => {
        let followed = await new Promise(async (resolve, reject) => {
            let sql = `select followed from ${config.schema}.follow where follower='${username}'`;
            con.query(sql, async (err, results) => {
                if (err) reject(err);
                if (results.length < 1) {
                    resolve([]);
                } else {
                    resolve(results);
                }
            });
        });
        let temp = `(`;
        for (var i = 0; i < followed.length; i++) {
            temp = temp + `'${followed[i].followed}'`;
            if (i !== followed.length -1) {
                temp = temp + ',';
            }
        }
        temp = temp + ')';
        let sql = `select * from ${config.schema}.tweets where username in ${temp}`;
        con.query(sql, async (err, results) => {
            if (err) reject(err);
            if (results.length < 1) {
                resolve([]);
            } else {
                resolve(results);
            }
        });
    });

}


exports.deleteTweet = function (operation_id) {
    return new Promise(async (resolve, reject) => {
        let sql = `delete from ${config.schema}.tweets where operation_id='${operation_id}'`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.like = function(tweet_op_id, username) {
    return new Promise(async (resolve, reject) => {
        let sql = `insert into ${config.schema}.like (tweet_op_id, user_id) values ('${tweet_op_id}', '${username}')`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.unlike = function(tweet_op_id, username) {
    return new Promise(async (resolve, reject) => {
        let sql = `delete from ${config.schema}.like where tweet_op_id = '${tweet_op_id}' and user_id = '${username}'`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.retweet = function(tweet_op_id, username) {
    return new Promise(async (resolve, reject) => {
        let sql = `insert into ${config.schema}.retweet (tweet_op_id, username) values ('${tweet_op_id}', '${username}')`;
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}




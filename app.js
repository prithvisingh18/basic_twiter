var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var redis = require("redis");
var redisStore = require('connect-redis')(session);

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var config = require('./config');
config.redisConfig.client = redis.createClient();
app.use(session({
    secret: config.sessionSecret,
    store: new redisStore(config.redisConfig),
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 600000
    }
}));

app.use('/', indexRouter);


//Db connection
var mysql = require('mysql');


global.con = mysql.createConnection({
    host: config.databaseConfig.host,
    user: config.databaseConfig.user,
    password: config.databaseConfig.password
});

con.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});


module.exports = app;

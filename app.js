
var express = require('express'),
        bodyParser = require('body-parser'),
        index = require('./routes/index'),
        books = require('./routes/books'),
        userbooks = require('./routes/userbooks'),
        users = require('./routes/users2'),
        config = require('./config'),
        auth = require('./auth/auth');


var app = express();
app.set('config', config);

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use('/', index)
    .use('/', users)
    .use('/', books)
    .use('/', userbooks)
    .use('/', auth)
    .listen('3200');

module.exports = app;


var express = require('express'),
        bodyParser = require('body-parser'),
        index = require('./routes/index'),
        books = require('./routes/books'),
        userbooks = require('./routes/userbooks'),
        users = require('./routes/users'),
        config = require('./private/config');

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
    .listen('3200');

module.exports = app;


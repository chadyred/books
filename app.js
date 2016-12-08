var express = require('express'),
        bodyParser = require('body-parser'),
        index = require('./routes/index'),
        books = require('./routes/books'),
        userbooks = require('./routes/userbooks'),
        users = require('./routes/users'),
        cors = require('cors'),
        config = require('./private/config');

var corsOptions = { origin : "http://localhost:8100" };

var app = express();
app.use(cors(corsOptions));
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


var app = require('../app');
var User = require('../models/userDB');
var Book = require('../models/bookDB');
var express = require('express');
var router = express.Router();

/* Get a simple message */
router.get('/welcome', function (req, res) {
    res.json({msg: "welcome"});
    res.end();
});

module.exports = router;

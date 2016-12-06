var app = require('../app');
var User = require('../models/userDB');
var Book = require('../models/bookDB');
var express = require('express');
var router = express.Router();


/* Route test */
router.get('/test', function (req, res) {
    db.connect('mongodb://localhost/books', function (err) {
        if (err) {
            //throw err;
            res.status(400).json({etat: 'error'});
            res.end();
        } else {
            res.json({etat: 'ok'});
            res.end();
        }
    });
    db.connection.close();

});



module.exports = router;

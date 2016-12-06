var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

/* Create a new user */
router.post('/user', function (req, res) {
    
    res.json({pseudo: 'List of users', message: 'List of users', users: 'test'});
})
/* Get a profil user */
.get('/user/:id', function (req, res) {
    var id = req.params.id
    res.json({title: 'one user', message: 'one user', id: id, user: id});
})
/* Delete a user */
.delete('/user/:id/', function (req, res) {
    var id = req.params.id;
})
/* Modify a user */
.put('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json({});
});

module.exports = router;

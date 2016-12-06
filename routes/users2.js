var app = require('../app');
var User = require('../models/userDB');
var Book = require('../models/bookDB');
var express = require('express');
var router = express.Router();


/* Create a new user */
router.post('/create/user', function (req, res) {
    if (req.body.pseudo && req.body.password && req.body.pseudo.length > 2 && req.body.password.length > 5) {
        var pseudo = req.body.pseudo;
        var password = req.body.password;
        var newUser = new User({
            pseudo: pseudo,
            password: password
        });

        newUser.save(function (err) {
            if (err) {
                res.status(400).json({error: true, message: "Impossible de créer cet utilisateur !"});
                res.end();
            } else {
                res.status(201).json({error: false, message: "L'utilisateur " + pseudo + " a été créé !"});
                res.end();
            }
        });
    } else {
        res.status(401).json({etat: false, message: "Vos identifiants sont erronés !"});
        res.end();
    }


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

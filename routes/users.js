var app = require('../app');
var User = require('../models/userDB');
var Book = require('../models/bookDB');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var checkToken = require('../auth/checkToken');
var checkForm = require('../services/checkForm');

// route to login a user (POST http://localhost:8080/api/login)
router.post('/login', checkForm, function (req, res, next) {
    var pseudo = req.user.pseudo;
    var password = req.user.password;

    User.findOne({
        pseudo: pseudo
    }, function (err, user) {

/*        if (err) throw err;*/

        if (!user) {
            res.status(401).json({success: false, message: 'Authentication failed. User not found !'});
        } else {

            // check if password matches
            if (password !== user.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password !'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, req.app.get('config').secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy a meal (token)!',
                    token: token
                });
            }

        }

    });

})

        /* Create a new user */
        .post('/user/create', checkForm, function (req, res) {
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
        .get('/user/profil', checkToken, function (req, res) {
            console.log(req.decoded._doc);
            var pseudo = req.decoded._doc.pseudo;
            var have =   req.decoded._doc.have;
            var unread = req.decoded._doc.unread;
            var read = req.decoded._doc.read;
            
            res.json({info: 'Your profil', pseudo: pseudo, have: have, unread: unread, read: read});
            res.end();
        })
        /* Delete a user */
        .delete('/user/:id/', checkToken, function (req, res) {
            var id = req.params.id;
        })
        /* Modify a user */
        .put('/user/:id', checkToken, function (req, res) {
            var id = req.params.id;
            res.json({});
        });

module.exports = router;

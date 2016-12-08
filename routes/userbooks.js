var express = require('express');
var router = express.Router();
var User = require('../models/userDB');
var Book = require('../models/bookDB');
var checkToken = require('../auth/checkToken');
var checkEAN = require('../services/checkEAN');
var _ = require('underscore');

/* Add a book to an user */
router.post('/user/book', checkToken, function (req, res) {

    /* Récupération var form */
    var eanForm = req.body.ean;
    var haveForm = req.body.have;
    var unreadForm = req.body.unread;
    var readForm = req.body.read;
    /* Fin récupération var form */

    /* Récupération des var user */
    var pseudo = req.decoded._doc.pseudo;
    User.findOne({
        pseudo: pseudo
    }, function (err, user) {
        if (!user) {
            res.status(401).json({success: false, message: 'Authentication failed. User not found !'});
        } else {
            var haveUser = user.have;
            var unreadUser = user.unread;
            var readUser = user.read;

            var msgHave = '';
            var msgUnread = '';
            var msgRead = '';

            console.log("0haveUser : " + JSON.stringify(haveUser));

            // Si on veut supprimer l'item de la collection have
            if (haveForm == 0) {
                haveUser = _.without(haveUser, _.findWhere(haveUser, {ean: eanForm}));
                console.log('Suppression du livre code ean : ' + eanForm);
            } else { // On veut ajouter un livre
                // On vérifie s'il n'est pas présent
                if (_.isUndefined(_.findWhere(haveUser, {ean: eanForm}))) {
                    var newObj = new Object();
                    newObj.ean = eanForm;
                    haveUser.push(newObj);
                    console.log("1haveUser : " + JSON.stringify(haveUser));
                    console.log("Ajout du livre.");

                } else {
                    console.log("Livre déjà présent chez user");
                }
            }
            console.log("2haveUser : " + JSON.stringify(haveUser));

            // Si on veut supprimer l'item de la collection unread
            // Si on unread est égal à 1, donc read est égal à 0
            // Si on veut supprimer l'item
            if(unreadForm == 0){
                unreadUser = _.without(unreadUser, _.findWhere(unreadUser, {ean: eanForm}));
                console.log('Suppression du livre code ean dans unread : ' + eanForm);
                
                // On vérifie s'il n'est pas présent
                if (_.isUndefined(_.findWhere(readUser, {ean: eanForm}))) {
                    var newObj = new Object();
                    newObj.ean = eanForm;
                    readUser.push(newObj);
                    console.log("1readUser : " + JSON.stringify(readUser));
                    console.log("Ajout du livre dans read.");

                } else {
                    console.log("Livre déjà présent dans unread");
                }
                
            }else{
                // Si unreadForm == 1 alors on doit supprimer le livre de read
                readUser = _.without(readUser, _.findWhere(readUser, {ean: eanForm}));
                console.log('Suppression du livre code ean dans read : ' + eanForm);
                
                // On vérifie s'il n'est pas présent
                if (_.isUndefined(_.findWhere(unreadUser, {ean: eanForm}))) {
                    var newObj = new Object();
                    newObj.ean = eanForm;
                    unreadUser.push(newObj);
                    console.log("1unreadUser : " + JSON.stringify(unreadUser));
                    console.log("Ajout du livre dans unread.");

                } else {
                    console.log("Livre déjà présent dans unread");
                }
            }



            // On stock la nouvelle collection de livre
            user.have = haveUser;
            user.read = readUser;
            user.unread = unreadUser;
            user.save(function (err, updated) {
                if (err)
                    return handleError(err);
                
                console.log("update : " + updated);
                
                res.json({success: true, msg: "Mise à jour de votre bibliothèque."});
            });

        }

    });
    /* Fin user */
   
   
})
        /* Display a list of books to an user */
        .get('/user/:iduser/books', function (req, res) {
            var iduser = req.params.iduser;
            res.json({title: 'List of books', message: 'List of books', id: iduser, user: iduser});
        })
        /* Display a book to an user */
        .get('/user/:iduser/book/:idbook', function (req, res) {
            var iduser = req.params.iduser;
            var idbook = req.params.idbook;
            res.json({title: 'one book', message: 'one book', id: iduser, user: iduser});
        })
        /* Delete one book of an user */
        .delete('/user/:iduser/book/:idbook', function (req, res) {
            var iduser = req.params.iduser;
            var idbook = req.params.idbook;
        })
        /* Delete all books of an user */
        .delete('/user/:iduser/books', function (req, res) {
            var iduser = req.params.iduser;
            res.json({title: 'Delete all books', message: 'Delete all books', id: iduser, user: iduser});
        })
        .put('/user/:id/book/idbook', function (req, res) {
            res.json({});
        });

module.exports = router;
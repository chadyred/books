var express = require('express');
var router = express.Router();
var User = require('../models/userDB');
var Book = require('../models/bookDB');
var checkToken = require('../auth/checkToken');
var checkEAN = require('../services/checkEAN');

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
            console.log(user.have);
            var haveUser = user.have;
            var unreadUser = user.unread;
            var readUser = user.read;

            for (var i = 0; i < haveUser.length; i++) {
                eanHaveUser = haveUser[i].ean;
                console.log("info : " + haveUser[i].ean + ' : ' + haveUser[i].title);
                //Si ean existe et si user l'a supprimé
                if((eanHaveUser == eanForm) && (haveForm == 0)){
                    console.log('remove : '+ i + ' : ' + eanHaveUser );
                    //remove item i
                    
                }
                    
                
                

            }

            console.log("haveUser : " + JSON.stringify(haveUser));

        }

    });
    /* Fin user */




    // S'il faut vérifier si l'ean existe dans chaque dépôt (have, read, unread)
    // S'il n'existe pas AND si on veut l'ajouter
    /*
     var status = new Object();
     if ((typeof haveForm !== 'undefined') && (haveForm  === '1')) {
     status.have = eanForm;
     }
     if ((typeof unreadForm !== 'undefined') && (unreadForm === '1')) {
     status.unread = eanForm;
     } else {
     status.read = eanForm;
     }
     status.createdAt = Date.now();
     
     console.log(status);
     
     // Récupérer l'user en cours
     // Récupérer ses infos (have, unread, read)
     // Ajouter les nouvelles infos passées dans le form (have,unread, read)
     // Mettre à jour l'user
     
     /*User.findOne({
     pseudo: pseudo
     }, function (err, user) {
     
     if (!user) {
     res.status(401).json({success: false, message: 'Authentication failed. User not found !'});
     } else {
     
     var book = {
     ean: '9782212132000',
     title: 'test2',
     date: Date.now()
     };
     
     user.have = book;
     user.save(function (err) {
     if (err) {
     console.error('ERROR!');
     }
     });
     }
     });*/

    //res.json({pseudo: pseudo, ean: eanForm, have: have, unread: unread, read: read});
    res.json({ok: 'ok'});
    res.end();
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
var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

/* Add a book to an user */
router.post('/user/:iduser/book/:idbook', function (req, res) {
    var iduser = req.params.iduser;
    var idbook = req.params.idbook;
    res.json({pseudo: 'List of users', message: 'List of users', users: 'test'});
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
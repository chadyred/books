/* Manage books */

var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

/* Create a new book */


/* Create a new book */
router.post('/book', function (req, res) {
    
    res.json({pseudo: 'List of users', message: 'List of users', users: 'test'});
})
/* List all books */
.get('/books', function (req, res) {
    var id = req.params.id;
    res.json({title: 'one user', message: 'one user', id: id, user: id});
})
/* Display on book */
.get('/book/:id', function (req, res) {
    var id = req.params.id;
    res.json({title: 'one user', message: 'one user', id: id, user: id});
})
/* Delete a book */
.delete('/book/:id', function (req, res) {
    var id = req.params.id;
    
})
/* Update a book */
.put('/book/:id', function (req, res) {
    var id = req.params.id;
    res.json({});
});

module.exports = router;
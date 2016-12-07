/* Manage books */
var express = require('express');
var router = express.Router();
var checkToken = require('../auth/checkToken');
var checkEAN = require('../services/checkEAN');
//var myAmazon = require('../private/amazon');
var opHelper = require('../private/amazon2');


/* Route get ean book */
router.get('/book/ean/:ean', checkEAN, checkToken, function (req, res) {
    var ean = req.ean;
 console.log(ean);
    opHelper.execute('ItemLookup', {
        'IdType': 'EAN',
        'SearchIndex': 'All',
        'ItemId': ean,
        'ResponseGroup': 'ItemAttributes,Offers'
    }).then((response) => {
        console.log("Results object: ", response.result);
        console.log("Raw response body: ", response.responseBody);
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });


 /*   opHelper.execute('ItemSearch', {
        'SearchIndex': 'Books',
        'Keywords': 'harry potter',
        'ResponseGroup': 'ItemAttributes,Offers'
    }).then((response) => {
        console.log("Results object: ", response.result);
        console.log("Raw response body: ", response.responseBody);
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });*/


    res.json({success: true, ean: ean});
    res.end();
})

        /* Create a new book */
        .post('/book', function (req, res) {

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
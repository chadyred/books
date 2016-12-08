/* Manage books */
var express = require('express');
var router = express.Router();
var checkToken = require('../auth/checkToken');
var checkEAN = require('../services/checkEAN');
var opHelper = require('../private/amazon');
var parseString = require('xml2js').parseString;
var Book = require('../models/bookDB');

/* Route get ean book */
router.get('/book/ean/:ean', checkEAN, checkToken, function (req, res) {
    var ean = req.ean;
    console.log(ean);

    /* First check in database */
    // If present, get item and display to user
    //   Check date created
    //     if date created > 24 hours
    //       update get item to amazon product api
    //       update database item (to json)
    //     else
    //       get item and display to user  
    // If not present, get item to amazon product Api (APAC)
    //   Save item (to json) to database + created date

    Book.findOne({
        ean: ean
    }, function (err, item) {
        console.log("err ? " + err);

        if (!item) {
            console.log("Go to Amazon");
            /* Get to Amazon product API with EAN */

            opHelper.execute('ItemLookup', {
                'IdType': 'EAN',
                'SearchIndex': 'All',
                'ItemId': ean,
                'ResponseGroup': 'ItemAttributes,Images,OfferFull,Large'
            }).then((response) => {
                //console.log("Results object: ", response.result);
                //console.log("Raw response body: ", response.responseBody);

                var xml = response.responseBody;
                parseString(xml, function (err, result) {
                                       
                    var content = JSON.stringify(result);
                    console.log(content);
                    var tempItem = JSON.parse(content);
                    var Item = tempItem.ItemLookupResponse.Items[0].Item[0];
                    console.log("item : " + JSON.stringify(Item));
                    var DetailPageURL = Item.DetailPageURL[0];
                    var Asin = Item.ASIN[0];
                    
                    console.log("DetailPageURL : " + DetailPageURL);
                    
                    var Title = Item.ItemAttributes[0].Title[0];
                    console.log("Title : " + Title);
                    
                    var newItem = new Book({
                        title: Title,
                        ean: ean,
                        asin: Asin,
                        detailPageURL: DetailPageURL
                    });

                    newItem.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.status(400).json({error: true, message: "Error save item to database !"});
                            res.end();
                        } else {
                            res.status(200).json({
                                success: true,
                                message: "Great !",
                                title: Title,
                                ean: ean,
                                asin: Asin,
                                detailPageURL: DetailPageURL,
                                content: JSON.stringify(Item)
                            });
                            res.end();
                        }
                    });

                });


            }).catch((err) => {
                console.error("Something went wrong! ", err);

                res.status(404).json({success: false, message: 'Item not found'});
                res.end();

            });

        } else {
           
            var Title = item.title;
            var Content = item.content;
           
            res.status(200).json({
                success: true,
                title: Title,
                content: Content
                
            });
            res.end();

        }

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


    // res.json({success: true, ean: ean});
    // res.end();
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
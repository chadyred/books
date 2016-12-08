BOOKS : Ma bibliothèque en ligne
================================

INFORMATIONS ABOUT API REST :
-----------------------------
This BOOKS app is an API Rest with :
- NodeJS,
- ExpressJS,
- Apac (Amazon Product API),
- Mongoose (for MongoLab)

FUNCTIONS :
-----------
- create a new user,
- login a created user,
- display a profile connected user and display his books,
- get some informations book from Amazon API,
- edit a collection books of a connected user (have, unread and read)

ROUTES :
--------
POST /user/create : create a new user (pseudo and password)
POST /login : login user with pseudo and password, return token (x-access-token)
GET /user/profil : get some informations about connected user (for example collections : have, unread, read)
GET /book/ean/9782212137149 : get some informations of book since Amazon API, return title, ean, asin and pageDetailUrl
POST /user/book : edit, add, remove book in collection (have, unread and read) of a connected user.

For example :
------------

To add a book (9782212137149) in collection 'have' :
input name : ean    = 9782212137149 (type hidden)
input name : have   = 1 (type checkbox)
input name : read   = 0 (type radio)
input name : unread = 1 (type radio)

It means that user have this book (9782212137149) and not read.

AMAZON PRODUCT API :
--------------------

You must create a Amazon Account with AWS (id, secret and assocationID).

If a product is not present in mongo database, the product will be added from Amazon Product API and returned.
If a product is present in mongo database, the product will be returned




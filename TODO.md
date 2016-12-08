TODO
====

1) Get more informations books from Amazon Product API like:
- url thumb image, url big image 
and store them to display 
- price,
- available,
- offers,
- review etc..

2) Create route with some paramters to get more information, for example :
GET /book/ean/xxxxxx/all : get all information
GET /book/ean/xxxxx/offers : get all offers vendors
GET /book/ean/xxxxx/review : get review or product

3) Check code EAN if the parity key (8 or 13th number) is good.

4) Enhance cache of products in database. For example, if the created date of product is > 24 hours, update product form Amazon Product API.

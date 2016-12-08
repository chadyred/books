HOW TO INSTALL YOUR API REST NODEJS "BOOKS"
===========================================

Steps:
------

1) Clone https://github.com/chadyred/books.git
2) Go to your directory app
3) Execute the command 'npm install' to install dependances of package.json
4) Edit /private/amazon.dist.js, add your awsId, aswSecret, assocId, locale. Rename amazon.dist.js to amazon.js (You must create an Amazon account API Product)
5) Edit /private/configDB.dist.js, add your login, password, url, port and db. Rename configDB.dist.js to configDB.js (You must have a Mlab account)
6) Edit /private/config.dist.js, add your secret key. Rename config.dist.js to config.js
7) Use the command 'nodemon' to start API Rest "Books" (install nodemon with the command 'npm install nodemon -g')

Test your install:
------------------

1) Go to URL http://127.0.0.1:3200/welcome in your browser, you must have {"msg":"welcome"}








var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res, next) {
	 var user = {pseudo: "toto", password: "toto"}
	 var pseudo = req.body.pseudo
	 var password = req.body.password

    if (pseudo !== user.pseudo) {
      res.json({ success: false, message: 'Authentication failed. User not found.,', user: user.pseudo, pseudo : req.body });
    } else {

      // check if password matches
      if (password !== user.password) {
        res.json({ success: false, messagve: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, req.app.get('config').secret, {
          expiresIn : 60 // expires in 24 hours
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


module.exports = router;
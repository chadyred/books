var express = require('express'),
    router = express.Router();

/* Route test */
router.get('/', function (req, res) {
    res.json({title: 'Bienvenue', message: 'Accueil'});
});

module.exports = router;

var checkForm = function (req, res, next) {
    if (req.body.pseudo && req.body.password && req.body.pseudo.length > 2 && req.body.password.length > 5) {
     
        req.user = { pseudo: req.body.pseudo, password: req.body.password };
        
        next();
    } else {
        res.status(400).json({
            success: false,
            message: 'Vos paramètres sont incorrectes !'
        });
        res.send();
    }
};

module.exports = checkForm;
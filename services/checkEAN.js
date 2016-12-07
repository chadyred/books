var checkEAN = function (req, res, next) {
    if (req.params.ean && (req.params.ean.length === 8 || req.params.ean.length === 13)) {
        var ean = req.params.ean;
        
        /* Faire le calcul de la clé pour vérifier si le code barre est correct */
                
        req.ean = req.params.ean;
        next();
    } else {
        res.status(400).json({
            success: false,
            message: 'Code barre EAN erroné !'
        });
        res.send();
    }
};

module.exports = checkEAN;
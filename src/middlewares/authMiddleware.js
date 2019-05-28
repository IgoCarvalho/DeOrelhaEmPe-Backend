const jwt = require('jsonwebtoken');
const config = require('../../config/properties.json');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, config.secretKey, (erro, decoded) => {
        if(erro) return res.status(401).send({'erro': 'token invalido'});

        req.userId = decoded.id;

        return next();
    })
}
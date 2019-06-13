const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.SECRET_KEY, (erro, decoded) => {
        if(erro) return res.status(401).send({'erro': erro});

        req.userId = decoded.id;

        return next();
    })
}
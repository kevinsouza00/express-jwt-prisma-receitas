
const jwt = require('jsonwebtoken');
const config = require('../config/config');


function authMiddleware(req, res, next) {
    const { authorization } = req.headers;


    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }


    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, config.secret);
        req.usuarioId = decodedToken.usuarioId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token de autenticação inválido' });
    }
}

module.exports = authMiddleware;

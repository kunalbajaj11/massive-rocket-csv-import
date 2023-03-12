const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

module.exports = function(req, res, next) {
    // get token from headers
    const token = req.header('x-auth-token');

    // if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
}
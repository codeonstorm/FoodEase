const { verify } = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.access_token;
    if(!token) return res.status(401).send();

    try {
        const decodeUser = verify(token, process.env.JWT_SECRET);
        req.user = decodeUser;
    } catch (error) {
        res.status(401).send();
    }

    return next();

}

module.exports = authMiddleware;
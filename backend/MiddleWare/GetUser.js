var jwt = require('jsonwebtoken');
const jwt_SECRET = "BLAH#BL@#";

const getUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ Error: "INVALID TOKEN BRAV!!!!" });
    }
    try {
        const data = jwt.verify(token, jwt_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ Error: "INVALID TOKEN BRAV!!!!" });
    }
}

module.exports = getUser;

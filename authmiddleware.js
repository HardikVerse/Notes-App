const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "You are not logged in."
        });
    };

    const decoded = jwt.verify(token, "hardik11");
    const username = decoded.username;

    if (!username) {
        return res.status(403).json({
            message: "malformed token"
        });
    };
    
    req.username = username;

    next();
};

module.exports = {
    authMiddleware
}
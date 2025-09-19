const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "Authorization token is required" });
    }
    
    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            req.username = decodedValue.username; // Correctly attach username to req object
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            });
        }
    } catch(e) {
        res.status(403).json({
            msg: "Incorrect token or token expired"
        });
    }
}

module.exports = adminMiddleware;
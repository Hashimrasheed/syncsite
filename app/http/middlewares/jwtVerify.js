const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).json({ error: "No token provided" })
    } else {
        let token = authHeader.split(" ")[1]
        jwt.verify(token, "loginsecret", (err, decoded) => {
            if (err) {
                res.status(500).json({ error: "Authentication failed" })
            } else {
                next()
            }
        })
    }

}

module.exports = {
    verifyToken
}
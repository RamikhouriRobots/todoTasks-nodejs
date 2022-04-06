const jwToken = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
    const token = request.body.token || request.query.token || request.headers["x-access-token"];
    if (!token) {
        return response.status(403).send("Authentication is required")
    }
    try {
        const decodedToken = jwToken.verify(token, process.env.TOKEN_KEY);
        request.user = decodedToken;
    } catch (err) {
        return response.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
const jwt = require("jsonwebtoken");
const { LECTURER } = require("../constant/role");
function checkAuthentication(req, res, next) {
    console.log(req.headers.authorization);
    let token = req.headers.authorization?.replaceAll("Bearer ", "");
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {}
    }
    return res.status(401).send({
        msg: "Unauthenticated",
    });
}

const isLecturer = (req, res, next) => {
    if (req.user.role === LECTURER) {
        return next();
    }
    res.status(403).send({
        msg: "Not authorized",
    });
};

module.exports = {
    checkAuthentication,
    isLecturer,
};

const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "no token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("JWT"));
    req.user = decoded.user;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

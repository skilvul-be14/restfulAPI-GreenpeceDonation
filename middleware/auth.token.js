const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      next();
    });
  }
}

function ifAdmin(req, res, next) {
  const admin = 1;
  if (req.cookies.userID != admin) {
    res.status(401).json({
      message: "Can't Access, You're not Admin",
    });
  } else {
    next();
  }
}

module.exports = {
  verifyToken: verifyToken,
  ifAdmin: ifAdmin,
};

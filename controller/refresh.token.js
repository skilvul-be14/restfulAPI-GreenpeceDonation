const models = require("../models/index");
const jwt = require("jsonwebtoken");

function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  models.Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  }).then((user) => {
    if (user == null) {
      if (!user) return res.sendStatus(403);
    } else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.sendStatus(403);
          const userId = user.id;
          const name = user.name;
          const email = user.email;
          const accesToken = jwt.sign(
            { userId, name, email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30s",
            }
          );
          res.json({ accesToken });
        }
      );
    }
  });
}

module.exports = {
  refreshToken: refreshToken,
};

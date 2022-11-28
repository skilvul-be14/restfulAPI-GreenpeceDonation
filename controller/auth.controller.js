const models = require("../models/index");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function register(req, res) {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ message: "Password Tidak cocok" });

  models.Users.findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: name,
              email: email,
              password: hash,
            };

            models.Users.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({
                  message: "Something went wrong!1212",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const userId = user.id;
              const name = user.name;
              const email = user.email;

              const accessToken = jwt.sign(
                { userId, name, email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "300s" },
                function (err, accessToken) {
                  res.status(200).json({
                    message: "Authentication successful!",
                    accessToken,
                  });
                }
              );

              const refreshToken = jwt.sign(
                { userId, name, email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
              );

              models.Users.update(
                { refresh_token: refreshToken },
                {
                  where: {
                    id: userId,
                  },
                }
              );
              res.cookie("refreshToken", refreshToken, {
                // httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                // secure: true,
              });

              res.cookie("userID", userId);
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
}

function logout(req, res) {
  const refresh_Token = req.cookies.refreshToken;

  models.Users.findOne({
    where: {
      refresh_token: refresh_Token,
    },
  }).then((user) => {
    if (!user) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      const userId = user.id;
      models.Users.update(
        { refresh_token: null },
        {
          where: {
            id: userId,
          },
        }
      );
      res.clearCookie("refreshToken");
      res.clearCookie("userID");
      res.clearCookie("eventID");
      return res.status(200).json({ message: "Logout Successful!" });
    }
  });
}

module.exports = {
  register: register,
  login: login,
  logout: logout,
};

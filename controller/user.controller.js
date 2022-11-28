const models = require("../models/index");

function getUsers(req, res) {
  models.Users.findAll().then((user) => {
    if (user === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json(user);
    }
  });
}

function getUserbyId(req, res) {
  models.Users.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    if (user === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json(user);
    }
  });
}

function updateUser(req, res) {
  models.Users.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    if (user === null) {
      res.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      res.status(200).json({ message: "User Updated" });
    }
  });
}

function deleteUser(req, res) {
  try {
    models.Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getUsers: getUsers,
  getUserbyId: getUserbyId,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

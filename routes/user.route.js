const express = require("express");
const userController = require("../controller/user.controller");
const verify = require("../middleware/auth.token");
const router = express.Router();

router.get(
  "/users",
  verify.verifyToken,
  verify.ifAdmin,
  userController.getUsers
);
router.get(
  "/users/:id",
  verify.verifyToken,
  verify.ifAdmin,
  userController.getUserbyId
);
router.patch(
  "/users/:id",
  verify.verifyToken,
  verify.ifAdmin,
  userController.updateUser
);
router.delete(
  "/users/:id",
  verify.verifyToken,
  verify.ifAdmin,
  userController.deleteUser
);
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;

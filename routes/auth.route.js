const express = require("express");
const authController = require("../controller/auth.controller");
const refreshToken = require("../controller/refresh.token");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/token", refreshToken.refreshToken);

module.exports = router;

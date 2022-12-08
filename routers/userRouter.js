const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.logIn);
router.post("/googleLogin", UserController.googleLogin);

module.exports = router;

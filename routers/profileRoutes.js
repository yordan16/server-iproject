const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profileController");
const authentication = require("../middleware/authentication");

router.use(authentication);
router.post("/", ProfileController.addProfile);
router.put("/:id", ProfileController.updataProfile);

module.exports = router;

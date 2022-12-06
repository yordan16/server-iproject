const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const profileRoutes = require("./profileRoutes");

router.use("/users", userRouter);
router.use("/profiles", profileRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const profileRoutes = require("./profileRoutes");
const productRoutes = require("./productRoutes");

router.use("/users", userRouter);
router.use("/profiles", profileRoutes);
router.use("/products", productRoutes);

module.exports = router;

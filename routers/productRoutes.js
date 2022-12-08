const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const authentication = require("../middleware/authentication");

router.use(authentication);
router.get("/", ProductController.getDataAPI);
router.get("/details", ProductController.getProduct);
router.get("/carts", ProductController.readCart);
router.post("/carts/payment", ProductController.payment);
router.post("/carts/:id", ProductController.addCart);
router.delete("/carts/delete/:id", ProductController.deleteCart);

module.exports = router;

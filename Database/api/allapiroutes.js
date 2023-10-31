const express = require("express");

const router = express.Router();

const customerRoutes = require("./customer");
const adminRoutes = require("./admin")
const productRoutes = require("./products")

router.use("/customer", customerRoutes);
router.use("/admin", adminRoutes);
router.use("/product", productRoutes);


module.exports = router;
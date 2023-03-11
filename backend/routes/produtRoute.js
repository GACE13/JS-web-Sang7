const express = require("express");
const 
{ 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProdcutDetails
} = require("../controllers/productController");

const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticatedUser,getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id")
    .put(updateProduct)
    .delete(deleteProduct)
    .get(getProdcutDetails);

module.exports = router
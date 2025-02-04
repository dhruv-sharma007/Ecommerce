import {
	addProduct,
	updateProduct,
	updateProductImage,
	deleteProduct,
	getAllProducts,
	getProductById,
	getProductByName,
	getProductByCategory,
	getProductBySeller,
} from "../Controller/Product.Controller.js"

import express from "express"
import { upload } from "../Middlewares/Multer.middleware.js"
import verifySeller from "../Middlewares/Seller.Middleware.js"

const router = express.Router()

router.route("/add-product").post(verifySeller, upload.single("file"), addProduct)
router.route("/update-product").post(verifySeller, updateProduct)
router.route("/update-product-image").post(verifySeller, upload.single("file"), updateProductImage)
router.route("/delete-product").post(verifySeller, deleteProduct)

router.route("/get-all-products").get(getAllProducts)
router.route("/get-product-by-id/:_id").get(getProductById)
router.route("/get-product-by-name/:productName").get(getProductByName)
router.route("/get-product-by-category/:category").get(getProductByCategory)
router.route("/get-product-by-seller/:sellerId").get(getProductBySeller)

export default router

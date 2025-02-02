import { 
	addProduct, 
	updateProduct, 
	updateProductImage,
	deleteProduct,
} from "../Controller/Product.Controller.js"
import express from "express"
import { upload } from "../Middlewares/Multer.middleware.js"
import verifySeller from "../Middlewares/Seller.Middleware.js"

const router = express.Router()

router.route("/add-product").post(verifySeller, upload.single("file"), addProduct)
router.route("/update-product").post(verifySeller, updateProduct)
router.route("/update-product-image").post(verifySeller, upload.single("file"), updateProductImage)
router.route("/delete-product").post(verifySeller, deleteProduct)

export default router

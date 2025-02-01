import { addProduct } from "../Controller/Product.Controller.js"
import express from "express"
import { upload } from "../Middlewares/Multer.middleware.js"
import verifySeller from "../Middlewares/Seller.Middleware.js"

const router = express.Router()

router.route("/add-product").post(verifySeller, upload.single("file"), (addProduct))

export default router

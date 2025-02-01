import { uploadProductImage } from "../Utils/UploadFiles.js";
import { Product } from "../Model/Product.Model.js";
import ApiError from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
	const { name, price, category, description } = req.body;

	if (!name || !price || !category || !description) {
		throw new ApiError(403, "All fields are required");
	}

	if (!req.file) {
		throw new ApiError(403, "Product image not provided");
	}

	const uploadedImage = await uploadProductImage(req.file);
	console.log(uploadedImage)

	if (uploadedImage) {
		const result = await Product.create({
			name,
			price,
			seller: req.user?._id,
			category,
			description,
			imageUrl: uploadedImage,
		});
		console.log(result);
		res.status(201).json(new ApiResponse(201, {}, "Product added succesfully"));
	}

	res.status(400).json( new ApiError(400, "Error"))
});

export { addProduct };

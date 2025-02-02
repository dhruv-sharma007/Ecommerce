import { uploadProductImage } from "../Utils/UploadFiles.js";
import { Product } from "../Model/Product.Model.js";
import ApiError from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import mongoose from "mongoose";
import check from "../Utils/Check.js"

const addProduct = asyncHandler(async (req, res) => {
	const { name, price, category, description } = req.body;

	if (!name || !price || !category || !description) {
		throw new ApiError(403, "All fields are required");
	}

	if (!req.file) {
		throw new ApiError(403, "Product image not provided");
	}

	const uploadedImage = await uploadProductImage(req.file);

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

	res.status(400).json(new ApiError(400, "Error"));
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, category, description, _id } = req.body;

	if (!name && !price && !category && !description) {
		throw new ApiError(403, "All fields are required");
	}

	const updateField = {};
	if (name) updateField.name = name;
	if (price) updateField.price = price;
	if (category) updateField.category = category;
	if (description) updateField.description = description;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		throw new ApiError(400, "Invalid product ID");
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		_id,
		{ $set: updateField },
		{ new: true }
	);

	if (!updatedProduct) {
		throw new ApiError(404, "Product not found");
	}

	res
		.status(200)
		.json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const updateProductImage = asyncHandler(async (req, res) => {
	const { _id } = req.body;
	if (!req.file) {
		throw new ApiError(404, "Product Photo Not Received!");
	}

	const imageUrl = await uploadProductImage(req.file);

	if (!imageUrl) {
		throw new ApiError(500, "Image not uploaded");
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		_id,
		{ $set: { imageUrl } },
		{ new: true }
	);
	if (!updatedProduct) {
		throw new ApiError(404, "Product not found");
	}

	res
		.status(200)
		.json(
			new ApiResponse(200, updatedProduct, "Product Image updated successfully")
		);
});

const deleteProduct = asyncHandler(async (req, res) => {
	const { _id } = req.body;

	check(mongoose.Types.ObjectId.isValid(_id), 400, "Invalid product ID")

	const deleteProduct = await Product.findByIdAndDelete(_id, )

	check(deleteProduct, 404, "Product not found")

	res
	.status(200)
	.json(new ApiResponse(200, deleteProduct, "Product deletef successfully"))

});

export { 
	addProduct, 
	updateProduct, 
	updateProductImage,
	deleteProduct,
};

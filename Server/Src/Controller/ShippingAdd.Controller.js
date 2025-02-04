import { ShippingAddress } from "../Model/ShippingAddress.model.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const addShippingAddress = asyncHandler(async (req, res) => {
	const { addressLine1, addressLine2, city, state, country, pinCode } =
		req.body;
	const userId = req.user._id;

	if (!addressLine1 || !city || !state || !country || !pinCode) {
		throw new ApiError(400, "All fields are required");
	}

	await ShippingAddress.create({
		user: userId,
		addressLine1,
		addressLine2,
		city,
		state,
		country,
		pinCode,
	});

	res.status(201).json(new ApiResponse(201, "Shipping address added"));
});

const getShippingAddress = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const shippingAddress = await ShippingAddress.findOne({ user: userId });

	if (!shippingAddress) {
		throw new ApiError(404, "Shipping address not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, shippingAddress, "Shipping address found"));
});

const removeShippingAddress = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const shippingAddress = await ShippingAddress.findOneAndDelete({
		user: userId,
	});

	if (!shippingAddress) {
		throw new ApiError(404, "Shipping address not found");
	}

	return res.status(200).json(new ApiResponse(200, "Shipping address removed"));
});

const updateShippingAddress = asyncHandler(async (req, res) => {
	const { addressLine1, addressLine2, city, state, country, pinCode } =
		req.body;

	const userId = req.user._id;

	if (
		!addressLine1 &&
		!addressLine2 &&
		!city &&
		!state &&
		!country &&
		!pinCode
	) {
		throw new ApiError(400, "Atleast one field is required to update");
	}

	const updateFields = {};

	if (addressLine1) updateFields.addressLine1 = addressLine1;
	if (addressLine2) updateFields.addressLine2 = addressLine2;
	if (city) updateFields.city = city;
	if (state) updateFields.state = state;
	if (country) updateFields.country = country;
	if (pinCode) updateFields.pinCode = pinCode;

	await ShippingAddress.findOneAndUpdate(
		{ user: userId },
		{ $set: updateFields },
		{ new: true }
	);

    res.status(200).json(new ApiResponse(200, "Shipping address updated"));
});

export {
	addShippingAddress,
	getShippingAddress,
	removeShippingAddress,
	updateShippingAddress,
};

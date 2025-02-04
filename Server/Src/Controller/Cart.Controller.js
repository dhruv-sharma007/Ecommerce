import asyncHandler from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Cart } from "../Model/Cart.Model.js";
import { grCheck } from "grom-utils";

const addToCart = asyncHandler(async (req, res) => {
	const { productId, quantity } = req.body;
	const userId = req.user._id;

	let cart = await Cart.findOne({ user: userId });

	if (!cart) {
		cart = new cart({ user: userId, items: [] });
	}

	const itemIndex = cart.items.findIndex((item) =>
		item.product.equals(productId)
	);

	if (itemIndex) {
		cart.items[itemIndex].quantity += quantity || 1;
	} else {
		cart.items.push({ product: productId, quantity: quantity || 1 });
	}

	await cart.save();

	res.status(200).json(new ApiResponse(200, "Product added to cart"));
});

const removeFromCart = asyncHandler(async (req, res) => {
	const { productId } = req.body;
	const userId = req.user._id;

	grCheck(productId, 400, "Product Id is required");

	const updatedCart = await Cart.findOneAndUpdate(
		{ user: userId },
		{ $pull: { items: { product: productId } } }, // This will remove the item with the given productId
		{ new: true }
	);

	grCheck(updatedCart, 404, "Cart not found");

	return res.status(200).json(200, "item removed from cart");
});

const getCart = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const cart = await Cart.findOne({ user: userId });

	if (!cart) {
		return res.status(200).json({ message: "Cart is empty", items: [] });
	}

	return res.status(200, new ApiResponse(200, cart));
});

const clearCart = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const cart = await Cart.findOneAndUpdate(
		{ user: userId },
		{ $set: { items: [] } },
		{ new: true }
	);

	grCheck(cart, 404, "Cart found not found");

	res.status(200).json(new ApiResponse(200, {}, "Cart Cleared"));
});

export { addToCart, removeFromCart, getCart, clearCart };

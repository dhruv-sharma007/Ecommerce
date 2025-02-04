import { Order } from "../Model/Order.Model.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import { Payment } from "../Model/Payment.Model.js";

const createOrder = asyncHandler(async (req, res) => {
	const { total, items, shippingAddress } = req.body;
	const { method } = req.body;
	const userId = req.user._id;

	if (!total || !items || !shippingAddress) {
		throw new ApiError(400, "All fields are required");
	}

	const order = await Order.create({
		buyer: userId,
		total,
		items,
		shippingAddress,
	});

	await Payment.create({
		order_id: order._id,
		amount: total,
		method,
	});

	res.status(201).json(new ApiResponse(201, "Order created"));
});

const getOrders = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const orders = await Order.aggregate([
		{
			$match: {
				buyer: userId,
			},
		},
		{
			$lookup: {
				from: "payments",
				localField: "_id",
				foreignField: "order_id",
				as: "paymentDetails",
			},
		},
		{
			project: {
				_id: 1,
				total: 1,
				items: 1,
				status: 1,
				shippingAddress: 1,
				createdAt: 1,
				"paymentDetails.method": 1,
				"paymentDetails.status": 1,
				"paymentDetails.amount": 1,
			},
		},
	]);

    if (!orders) {
        throw new ApiError(404, "No orders found");
    }
    res.status(200).json(new ApiResponse(200, orders, "Orders found"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        throw new ApiError(400, "All fields are required");
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    res.status(200).json(new ApiResponse(200, "Order status updated"));
})

export {createOrder, getOrders, updateOrderStatus};

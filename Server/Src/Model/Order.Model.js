import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: [
			"Pending",
			"Confirmed",
			"Shipped",
			"Delivered",
			"Out for delivery",
			"Cancelled",
			"Returned",
		],
		default: "Pending",
	},
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: {
				type: Number,
				required: true,
				default: 1,
			},
		},
	],
	shippingAddress: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ShippingAddress",
		required: true,
	},
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema)

export {
    Order
}
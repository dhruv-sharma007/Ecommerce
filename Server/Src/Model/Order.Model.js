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
			"Cancelled",
			"Returned",
		],
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
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema)

export {
    Order
}
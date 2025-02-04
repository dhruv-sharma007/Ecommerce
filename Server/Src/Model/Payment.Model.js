import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
	{
		order_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		method: {
			type: String,
			enum: ["COD", "Online"],
			required: true,
		},
		status: {
			type: String,
			enum: ["Paid", "Pending"],
			required: true,
			default: "Pending",
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const Payment = mongoose.model("Payment", PaymentSchema)

export {
    Payment
}

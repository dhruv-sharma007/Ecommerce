import mongoose from "mongoose";

const ShippingAddressSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	addressLine1: {
		type: String,
		required: true,
	},
	addressLine2: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	pinCode: {
		type: Number,
		required: true,
	},
});

const ShippingAddress = mongoose.model("ShippingAddress", ShippingAddressSchema)

export{
    ShippingAddress
}

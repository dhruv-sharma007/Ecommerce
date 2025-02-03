import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		},
	],
});

const WishList = mongoose.model("WishList", wishListSchema)

export{
    WishList
}

import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating:{
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
})

const Review = mongoose.model("Review", ReviewSchema)

export {
    Review
}
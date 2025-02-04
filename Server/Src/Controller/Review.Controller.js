import asyncHandler from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import { Review } from "../Model/Review.Model.js";

const addReview = asyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    if (!productId || !rating || !comment) {
        throw new ApiError(400, "All fields are required");
    }

    await Review.create({
        product: productId,
        rating,
        comment,
        user: userId,
    });

    res.status(201).json(new ApiResponse(201, "Review added"));
})

const getReviews = asyncHandler(async (req, res) => {
    const productId = req.params.productId;

    const reviews = await Review.find({ product: productId }).populate("user", "name email");

    if (!reviews) {
        throw new ApiError(404, "No reviews found");
    }

    res.status(200).json(new ApiResponse(200, reviews, "Reviews found"));
})

const editReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const reviewId = req.params.reviewId;

    if (!rating || !comment) {
        throw new ApiError(400, "All fields are required");
    }

    const review = await Review.findByIdAndUpdate(
        reviewId,
        { rating, comment },
        { new: true }
    );

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    res.status(200).json(new ApiResponse(200, "Review updated"));
})

export { addReview, getReviews, editReview };
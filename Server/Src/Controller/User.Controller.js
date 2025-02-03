import mongoose from "mongoose"
import WishList from "../Model/WishList.Model.js"
import { User } from "../Model/User.Model.js";
import Product from "../Model/Product.Model.js"

import asyncHandler from "../Utils/AsyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import { grCheck } from "grom-utils"
import jwt from "jsonwebtoken";

const options = {
	httpOnly: true,
	secure: true,
	samesite: "Strict",
};

const getAccessTokenAndRefreshToken = async (userId) => {
	const user = await User.findById(userId);
	const accessToken = await user.generateAccessToken();
	const refreshToken = await user.generateRefreshToken();

	user.refreshToken = refreshToken;
	await user.save({ validateBeforeSave: false });

	return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new ApiError(400, "All Fields are required");
	}

	if (
		[name, email, password].some((field) => {
			field?.trim === "";
		})
	) {
		throw new ApiError(400, "All Fields are required");
	}

	const existedUser = await User.findOne({ email });

	if (existedUser) {
		throw new ApiError(400, "User Already Exist");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	const createdUser = await User.findOne({ email }).select(
		" -password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(500, "Something went wrong while registering user!");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if ([email, password].some((field) => field?.trim === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const user = await User.findOne({ email });

	grCheck(user, 404, "User not found")

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(404, "Invalid Password");
	}

	const { accessToken, refreshToken } = await getAccessTokenAndRefreshToken(
		user._id
	);

	const loggedInUser = await User.findById(user._id).select(
		" -password -refreshToken"
	);

	res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser
				},
				"User Logges In Succefully"
			)
		);
});

const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingrefreshToken =
		req.cookies.refreshToken || req.body.refreshToken;
	if (!incomingrefreshToken) {
		throw new ApiError(400, "Unauthorized request");
	}

	const decodedToken = await jwt.verify(
		incomingrefreshToken,
		process.env.REFRESH_TOKEN
	);

	const user = await User.findById(decodedToken).select(
		" -password -refreshToken"
	);

	const { accessToken } = await getAccessTokenAndRefreshToken(user._id);

	return res
		.status(200)
		.cookie("accessToken", accessToken)
		.json(new ApiResponse(200, {}, "AccessToken refreshed succussfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(200, req.user, "User found successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if ([oldPassword, newPassword].some((field) => field?.trim === "")) {
		throw new ApiError(400, "Both password field are required");
	}
	const user = await User.findById(req.user?._id);

	if (!user) {
		throw new ApiError(404, "User Not Found");
	}

	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

	if (!isPasswordCorrect) {
		throw new ApiError(400, "The password is not valid");
	}

	user.password = newPassword;
	user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
	const { name, email } = req.body;

	if (!name && !email) {
		throw new ApiError(400, "One field is required to change update profile");
	}

	const updateField = {};
	if (name) updateField.name = name;
	if (email) updateField.email = email;

	const user = await User.findByIdAndUpdate(
		req.user?._id,
		{ $set: updateField },
		{ new: true }
	).select(" -password -refreshToken");

	res
		.status(200)
		.json(new ApiResponse(200, user, {} ,"Profile Updated Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(req.user?._id, {
		$set: {
			refreshToken: undefined,
		},
	});

	res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "User logged out successfully"));
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const wishlist = await WishList.findOneAndUpdate(
        { user: userId },
        { $addToSet: { items: productId } },
        { new: true, upsert: true }
    );

    res.status(200).json(new ApiResponse(200, wishlist, "Product added in whishlist"));
});

const removeWhishList = asyncHandler(async(req, res)=>{
	const { productId } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const wishlist = await WishList.findOneAndUpdate(
        { user: userId },
        { $pull: { items: productId } },
        { new: true }
    );

    res.status(200).json(new ApiResponse(200, wishlist, "Product removed in whishlist"));
});

export {
	registerUser,
	loginUser,
	refreshAccessToken,
	getCurrentUser,
	changeCurrentPassword,
	updateProfile,
	logoutUser,
	addToWishlist,
	removeWhishList
};

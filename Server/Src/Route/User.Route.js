import express from "express";
import verifyJwt from "../Middlewares/Auth.Middleware.js"
import { addToCart, removeFromCart, getCart, clearCart } from "../Controller/Cart.Controller.js"

import {
	registerUser,
	loginUser,
	refreshAccessToken,
	getCurrentUser,
	changeCurrentPassword,
	updateProfile,
	logoutUser,
	addToWishlist,
	removeWhishList
} from "../Controller/User.Controller.js";

import {
	createOrder, 
	getOrders, 
	updateOrderStatus
} from "../Controller/Order.Controller.js";

import { addReview, getReviews, editReview } from "../Controller/Review.Controller.js";

import {
	addShippingAddress,
	getShippingAddress,
	removeShippingAddress,
	updateShippingAddress,
} from "../Controller/ShippingAddress.Controller.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-accesstoken").post(refreshAccessToken);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/change-password").patch(verifyJwt, changeCurrentPassword);
router.route("/update-profile").patch(verifyJwt, updateProfile);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/add-wish").post(verifyJwt, addToWishlist);
router.route("/remove-wish").post(verifyJwt, removeWhishList);

router.route("/add-to-cart").post(verifyJwt, addToCart);
router.route("/remove-from-cart").post(verifyJwt, removeFromCart);
router.route("/get-cart").get(verifyJwt, getCart);
router.route("/clear-cart").get(verifyJwt, clearCart);

router.route("/create-order").post(verifyJwt, createOrder);
router.route("/get-orders").get(verifyJwt, getOrders);
router.route("/update-order-status").patch(verifyJwt, updateOrderStatus);

router.route("/add-shipping-address").post(verifyJwt, addShippingAddress);
router.route("/get-shipping-address").get(verifyJwt, getShippingAddress);
router.route("/remove-shipping-address").post(verifyJwt, removeShippingAddress);
router.route("/update-shipping-address").patch(verifyJwt, updateShippingAddress);

router.route("/add-review").post(verifyJwt, addReview);
router.route("/get-reviews/:productId").get(getReviews);
router.route("/edit-review/:reviewId").patch(verifyJwt, editReview);

export default router;

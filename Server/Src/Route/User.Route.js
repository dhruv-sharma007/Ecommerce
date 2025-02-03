import express from "express";
import verifyJwt from "../Middlewares/Auth.Middleware.js"

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

export default router;
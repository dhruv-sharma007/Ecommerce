import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["User", "Seller", "Admin"],
			default: "User",
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
	return await jwt.sign(
		{
			_id: this.id,
			email: this.email,
			role: this.role,
		},
		String(process.env.ACCESS_TOKEN),
		{
			expiresIn: "1d",
		}
	);
};

userSchema.methods.generateRefreshToken = async function () {
	return await jwt.sign(
		{
			_id: this.id,
		},
		String(process.env.REFRESH_TOKEN),
		{
			expiresIn: "7d",
		}
	);
};

const User = mongoose.model("User", userSchema);

export { User };
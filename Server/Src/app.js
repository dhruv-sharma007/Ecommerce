import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

const port = process.env.PORT || 8000;

//Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

//Routes Import
import userRoute from "./Route/User.Route.js"
import productRoute from  "./Route/Poduct.Route.js"

//Route Declaration
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)

export default app

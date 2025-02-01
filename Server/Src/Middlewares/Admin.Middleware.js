import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

const verifyAdmin = async(req, res, next)=>{
    const accessToken = req.cookies?.accessToken

    try {
        if(!accessToken){
            throw new ApiError(401, "You are not authorized!")
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
        req.user = decodedToken
        if (decodedToken.role === "Admin"){
            next()
        }
        else{
            throw new ApiError(401, "You are not authorized!")
        }
    } catch (error) {
        console.log(error)
    }
}

export default verifyAdmin
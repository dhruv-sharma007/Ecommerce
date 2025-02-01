import { User } from "../Model/User.Model.js";
import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJwt = asyncHandler(async(req, res, next)=>{
    try {
        const accessToken = req.cookies?.accessToken
    
        if(!accessToken){
            throw new ApiError(401, "You are not authenticated")
        }
    
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
    
        const user = await User.findOne({_id: decodedToken._id}).select(" -passowrd -refreshToken")
    
        req.user = user
    
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

})

export default verifyJwt

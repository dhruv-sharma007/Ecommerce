import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

const verifySeller = asyncHandler(async(req, res, next)=>{
    const accessToken = req.cookies?.accessToken

    if(accessToken){
        throw new ApiError(401, "You are not authorized!")
    }
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
    const { role } = decodedToken
    if (role === "Seller"){
        next()
    }
    else{
        throw new ApiError(401, "You are not authorized!")
    }
})

export default verifySeller
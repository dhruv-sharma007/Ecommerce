import ApiError from "./ApiError.js";

const check = (condition, statusCode, message)=>{
    if(!condition){
        throw new ApiError(statusCode, message)
    }
}

export default check
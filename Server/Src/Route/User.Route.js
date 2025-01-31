import express from "express";

import { 
    registerUser,
    loginUser,
} from "../Controller/User.Controller.js"

const router = express.Router()

router.route("/registeruser").post(registerUser)
router.route("/loginuser").post(loginUser)

export default router




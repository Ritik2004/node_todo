//we wil use this function where we think we need
//a mandatory login

import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated =async  (req, res, next) => {

    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success:false,
            message:"Pls login first"
        })
    }
    //if we have token then get info from it
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id);
    
    next();
}
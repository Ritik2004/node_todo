//this is a function for craeting token we will use this in
//register and login

import jwt from "jsonwebtoken";
export const sendCookie = (user,res,message,statusCode=200) => {
     //we are creating token and inside it we are storing user id
    //we also give secret with it
    const token = jwt.sign({_id: user._id} ,process.env.JWT_SECRET)
    
    console.log(process.env.NODE_ENV)
    console.log(process.env.NODE_ENV ==="Development")
    //here we are sending response of success along with this we are
    //are also sending cookies
    res
    .status(statusCode)
    .cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:process.env.NODE_ENV ==="Development"?"lax":"none",
        secure:process.env.NODE_ENV ==="Development"?false:true,
    })
    .json({
        success:true,
        message,

    })
}
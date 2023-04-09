import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";



export const getAllUsers = async (req,res)=>{}
export const register =  async (req,res)=>{
   try{
    const {name,email,password} = req.body;

    let  user = await User.findOne({email});

    if(user)
        return res.status(404).json({
            success:false,
            mesaage:"user already exist"
        })
    
        //id useris not there then we are creating one 
        // and with help of bcrypt we are hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

   user =  await User.create({name, email, password:hashedPassword });
     
   //we are using sendCookie function which have created in utils folder
   //this function creates cookie
   sendCookie(user, res, "Registered Successfully", 201);
   }catch(error){
       next(error)
   }
}

export const login = async (req,res,next) => {
   
    try{
        const { email, password } = req.body;
     
    const user = await User.findOne({email}).select("+password")
    //above we have written +password because findone will give email only
    if(!user)
    return res.status(404).json({
        success:false,
        message:"Invalid email or password"
    })

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    return res.status(404).json({
        success:false,
        mesaage:"Invalid email or password"
    })
    //if there is a maxtch then we will call sendcookie function
      sendCookie(user,res,`welocme back, ${user.name}`, 200)
    }catch(error){
         next(error)
    }
}
export const getMyProfile = (req,res)=>{
 
    //here we will check whether we are login or not
    //if we are then we can get id from token
    // const {token} = req.cookies;
    // if(!token){
    //     return res.status(404).json({
    //         success:false,
    //         message:"Pls login first"
    //     })
    // }
    // //if we have token then get info from it
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //  const user = await User.findById(decoded._id);


    res.status(200).json({
        success: true,
        user:req.user,
    })
}
export const logout = (req,res) => {
    res.status(200).cookie("token", "", {
     expires: new Date(Date.now()),
     sameSite:process.env.NODE_ENV ==="Development" ? "lax" : "none",
     secure:process.env.NODE_ENV ==="Development" ? false : true,
    
    })
    .json({
        success: true,
        user: req.user,
    })
}
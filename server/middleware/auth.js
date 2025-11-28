import User from "../models/user.js"
import jwt from "jsonwebtoken"


export const protectroute = async (req,res,next) => {
    try {
        console.log("All headers:", req.headers); // 💡 Debugging line
       const token = req.headers.token
        
        // 💡 Pehle check karo token hai ya nahi!
        if (!token) { 
             return res.status(401).json({ success: false, message: "JWT must be provided in headers" });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded.userID)
        const user = await User.findById(decoded.userID).select("-password")
        if(!user) return res.json({success:false,message:"user not found"});

        req.user=user    
        next()
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}
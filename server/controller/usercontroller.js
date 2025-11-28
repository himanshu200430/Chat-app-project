import { json } from "express";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.js"
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


export const signup = async(req,res) => {
    const {fullname,email,password,bio} = req.body

    try {
        if(!fullname || !email || !bio || !password){
            return res.json({success:false,message:"Anything is missing"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success:false,message:"Account already exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            fullname, email, password:hashedPassword, bio
        })

        const token = generateToken(newUser._id); 
        res.json({success:true, message:"Account created" , user:newUser, token})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})        
    }

}

export const login = async(req,res) => {
    try {
        const{email,password} = req.body;
        const userData = await User.findOne({email})
        const ispasswordcorrect = await bcrypt.compare(password,userData.password)
    
        if(!ispasswordcorrect){
            res.json({success:false, message:"Invalid Credentials"})
        }
        const token = generateToken(userData._id);
        res.json({success:true,message:"Login Successfull",userData,token})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})       
        
    }
}

export const checkAuth = (req,res) =>{
    res.json({success:true,user:req.user})
}


export const updateProfile = async(req,res) => {
try {

    const{Profilepic,bio,fullname} = req.body;
    const userId = req.user._id
    let updatedUser ;
    if(!Profilepic){
        updatedUser = await User.findByIdAndUpdate(userId,{bio,fullname},{new:true});
    }
    else{
        const upload = await cloudinary.uploader.upload(Profilepic);
        updatedUser = await User.findByIdAndUpdate(userId,{Profilepic: upload.secure_url,bio,fullname},{new:true})
    }
    res.json({success:true,user:updatedUser})
} catch (error) {
    console.log(error.message)
    res.json({success:false, message:error.message})
    
}

}
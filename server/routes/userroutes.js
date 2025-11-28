import express from 'express'
import { checkAuth, login, signup, updateProfile } from '../controller/usercontroller.js'
import { protectroute } from '../middleware/auth.js';

const userrouter = express.Router();


userrouter.post("/signup",signup);
userrouter.post("/login",login);
userrouter.put("/update-profile",protectroute,updateProfile);
userrouter.get("/check",protectroute,checkAuth);
export default userrouter
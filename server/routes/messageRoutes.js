import express from "express"
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controller/messagecontroller.js"
import { protectroute } from "../middleware/auth.js"
const messageRouter = express.Router()

messageRouter.get("/users",protectroute,getUsersForSidebar)
messageRouter.get("/:id",protectroute,getMessages )
messageRouter.put("/mark/:id",protectroute,markMessageAsSeen)
messageRouter.post("/send/:id",protectroute  ,sendMessage)
export default messageRouter
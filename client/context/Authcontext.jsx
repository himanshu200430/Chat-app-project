import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl 
export const Authcontext = createContext();


export const AuthProvider = ({children})=>{

    const [token,setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser] = useState(null);
    const [onlineUser,  setonlineUser] = useState([])
    const [socket, setSocket] = useState(null)

    // check if user is authenticated and if so, set the user data and connect the socket
        
    const checkAuth = async () => {
        if(!token) return;
        try {
        const {data} = await axios.get("/api/auth/check")
        if(data.success){
            setAuthUser(data.user)
            connectSocket(data.user)
        } 
        } catch (error) {
            toast.error(error.message)
             
        }
    }
    
    //Login function to handle user authentication and socket connection
const login = async (state, credentials) => { 
    try {
        const {data} = await axios.post(`/api/auth/${state}`, credentials)
        if(data.success){
            setAuthUser(data.userData || data.user)
            connectSocket(data.userData || data.user)
            axios.defaults.headers.common["token"] = data.token;  
            setToken(data.token)
            localStorage.setItem("token", data.token)
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }
        
    } catch (error) {
        toast.error(error.message)
        
    }
}


// Logout function to handle user logout and socket disconnection
const logout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
    setToken(null);
    setonlineUser([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    socket.disconnect();
}

// update profile function to handle user profile updates
const updateProfile = async (body) => {
    try {
        axios.defaults.headers.common["token"] = localStorage.getItem("token");
        const {data} = await axios.put("/api/auth/update-profile", body)
        if(data.success){
            setAuthUser(data.user) 
            console.log(authUser)
            toast.success("Profile updated successfully")
        }
        else{
            toast.error(data.message)
        }
    }
    catch (error) {
        toast.error(error.message)
    }
}

    // connect socket function to handle socket connection and online users updates
    const connectSocket = (userData) => {
       if(!userData || socket?.connected) return;
         const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
         });
         newSocket.connect();
         setSocket(newSocket);
         newSocket.on("getOnlineUsers", (userIds) => {
            setonlineUser(userIds);
         });
        }
        
        useEffect(()=>{
            if(token){
                axios.defaults.headers.common["token"] = token;
                checkAuth(); // अब यह केवल तभी चलेगा जब token होगा
            } else {
                // अगर token नहीं है, तो ensure करें कि authUser null है
                setAuthUser(null); 
            }
        },[token])
        const value = { 
        axios,
        authUser,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile
    }

return (
    <Authcontext.Provider value={value}>
        {children}
    </Authcontext.Provider>
)
}

import { createContext, useState, useContext, useEffect } from "react";
import { Authcontext } from "./Authcontext";
import toast from "react-hot-toast";


export const Chatcontext = createContext();

export const ChatProvider = ({children})=>{
    const [messages, setMessages] = useState([]);
    const [ users, setUsers] = useState([]);
    const [ selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios} = useContext(Authcontext);
    
    // function to get all users
    const getUsers = async()=>{
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message); 
        }
    }

    // function to get message for selected user
    const getMessages = async(userId)=>{
        try {
        const {data} =   await axios.get(`/api/messages/${userId}`); 
        if(data.success){
            setMessages(data.messages);
        }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                // ✅ Correct: Functional update form already present
                setMessages((prevMessages) => [...prevMessages, data.newMessage]); 
            } 
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);        
        }
    }

    // 💡 FIX: Removed separate subscribeToMessages and unsubscribeFromMessages functions.
    // Logic is now directly handled in useEffect for maximum stability.
    useEffect(() => {
        if (!socket) return;

        // 💡 FIX: Listener function ko useEffect ke andar define kiya. 
        // Yeh clean closure ensure karta hai jo latest selectedUser ko use karta hai.
        const handleNewMessage = (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                
                // Functional update is good for avoiding stale state
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId]: 
                    prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1,
                }));
            }
        };

        // 1. Attach the specific listener function
        socket.on("newMessage", handleNewMessage);

        // 2. Cleanup: Remove the exact listener function instance.
        // 💡 FIX: socket.off("event", handler) ensures only this instance is removed,
        // preventing duplicate listeners and improving reliability on re-run.
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
        
        // Dependencies are socket, selectedUser, and axios (for linting)
    }, [socket, selectedUser, axios]); 

    // 💡 FIX: Removed the empty and unnecessary useEffect that previously called the functions.
    
    const value = {
       messages,
       users,
       selectedUser,
       getUsers,
       getMessages,
       sendMessage,
       setSelectedUser,
       unseenMessages,
       setUnseenMessages,
    } 

    return (
        <Chatcontext.Provider value ={value}>
            {children}
        </Chatcontext.Provider>
    )
}
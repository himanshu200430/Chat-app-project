import React, {useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../../context/Authcontext'
import assets from '../assets/chat-app-assets/assets'
import { Chatcontext } from '../../context/Chatcontext'
import { Menu } from 'lucide-react'
const Sidebar = () => {
  const {getUsers,users, selectedUser, setSelectedUser,unseenMessages,setUnseenMessages} = useContext(Chatcontext)
  const {logout,onlineUser} = useContext(Authcontext)
  const [input,setInput] = useState(false)
  const navigate = useNavigate()
  const [click,setClick] = useState("")

  const filteredUsers = input ? users.filter((user) =>
    user.fullname.toLowerCase().includes(input.toLowerCase())
  ) : users;

  useEffect(() => { 
    getUsers()
  }, [onlineUser]);
 
  return (
    <div className={` bg-red-700/30 backdrop-blur-xl h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden": ''}`}>
      <div className="pb-5">
        <div className='flex items-center justify-between relative'>
          {/* Left side logo + title */}
          <div className="flex items-center gap-3">
            <img className='max-w-8 max-h-8' src="/chat.png" alt="" />
            <h1 className='font-bold text-white'>CHATZEE</h1>
          </div>

          {/* Right side menu */}
          <div className="relative group">
            <Menu size={24} className='cursor-pointer' onClick={()=>setClick(prev => prev === "Trigger" ? "" : "Trigger")}/>

            {/* Dropdown */}
            { click ==="Trigger" &&
            <div className='absolute top-full right-0 z-20 w-32 p-3 rounded-md bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black
        backdrop-blur-xl border-amber-400 text-white shadow-lg shadow-black '>
              <p 
                onClick={() => navigate('/profile')} 
                className='cursor-pointer text-sm'
              >
                Edit Profile
              </p>
              <hr className='my-2 border-t border-amber-500' />
              <p onClick={()=> logout()} className='cursor-pointer text-sm'>Logout</p>
            </div>
            }
          </div>
        </div>
          <div className='bg-amber-500 border-3 border-amber-900 shadow-xl shadow-black rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
            <img src={assets.search_icon} alt="" className='w-3 invert-100' />
            <input onChange={(e)=>setInput(e.target.value)} type="text" className='border-none outline-none
             text-black text-xs placeholder-black flex-1'
              placeholder='Search User...' />
          </div>
      </div>
      <div className='flex flex-col gap-1'>
        {
          filteredUsers.map((user,index)=>(
            <div onClick={()=>{setSelectedUser(user); setUnseenMessages(prev=>({...prev,[user._id]:0}))}} key={index} className={`relative flex items-center gap-2 p-2 pl-4 bg-gradient-to-r 
              from-red-900 
              via-red-500 
              to-black backdrop-blur-lg hover:bg-black/70 rounded cursor-pointer shadow-xl shadow-black max-sm:text-sm ${selectedUser?._id === user._id && ' bg-amber-400'}`}>
              <img src={user?.Profilepic || assets.avatar_icon} alt="" 
              className='w-[45px] aspect-[1/1] rounded-full'/>
              <div className='flex flex-col leading-5'>

              <p className='text-lg'>{user.fullname}</p>
              {
                onlineUser.includes(user._id)
                ? <span className='text-green-400 text-xs'>Online</span>
                : <span className='text-neutral-400 text-xs'>Offline</span>
              }
              </div>
            {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5
              flex justify-center items-center rounded-full bg-amber-400 shadow-lg shadow-black text-black'>{unseenMessages[user._id]}</p>}
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar

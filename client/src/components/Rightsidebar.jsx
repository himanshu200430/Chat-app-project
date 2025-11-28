import React, { useEffect } from 'react'
import assets, { imagesDummyData } from '../assets/chat-app-assets/assets'
import {useContext,useState} from 'react'
import { Chatcontext } from '../../context/Chatcontext'
import { Authcontext } from '../../context/Authcontext'
const Rightsidebar = () => {
  const {selectedUser,messages} = useContext(Chatcontext)
  const {logout,onlineUser} = useContext(Authcontext)
  const [msgImages,setMsgImages] = useState([])

  useEffect(()=>{
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  },[messages])
  return selectedUser && (
    <div className={`bg-red-700/30
        backdrop-blur text-white w-full relative oeverflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.Profilepic || assets.avatar_icon} alt="" className='w-38 aspect-[1/1] rounded-full'/>
        <h1 className='px-10 text-xl border-2 py-2 rounded-2xl bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black backdrop-blur-lg border-amber-950 font-medium mx-auto flex items-center gap-2 shadow-lg shadow-black'>
        {onlineUser.includes(selectedUser._id) && <p className='w-3 h-3 rounded-full bg-green-500'></p> }
         {selectedUser.fullname}
        </h1>
        <div className=' py-4 underline  hover:border-amber-900 rounded-2xl hover:shadow-lg shadow-black'>
        <p className='px-10 mx-auto text-'>Bio:-{selectedUser.bio}</p>
        </div>
      </div>
      <hr className='border-yellow-500 my-4' />
      <div className='px-5 text-xs '
      >
        <p className='text-2xl justify-center items-center flex'>Media</p>
        <div className='mt-2  max-h-[150px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 shadow-lg shadow-black p-2 rounded-lg border-2 border-amber-950 bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black backdrop-blur-lg'>
          {msgImages.length > 0 ? (
           msgImages.map((url, index)=>(
            <div key={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
              <img src={url} alt="" className='h-full rounded-md'/>
            </div>
          ))
        ):(
          <div className='text-white text-md '>
            No media available
             </div>

          )}
        </div>
        <div className='bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black backdrop-blur-lg border-2 py-3 shadow-lg shadow-black border-amber-950 my-3 rounded-2xl'>
          <p className='p-2 flex gap-2 text-md'>Contact info:<p className='text-blue-700'>{selectedUser.email}</p></p>

        </div>
      </div>

      <button onClick={()=> logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-amber-400 text-black border-amber-950 shadow-lg shadow-black
       text-sm hover:text-md  font-light py-2 px-20 cursor-pointer rounded-full'>
        Logout
      </button>
    </div>
  )
}

export default Rightsidebar

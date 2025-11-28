import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Rightsidebar from '../components/Rightsidebar'
import ChatContainer from '../components/ChatContainer'
import { Chatcontext } from '../../context/Chatcontext'


const Homepages = () => {
   const {selectedUser} = useContext(Chatcontext)

  return (
    

    <div className='flex items-center justify-center h-screen bg-no-repeat'>
    <div className={`backdrop-blur-xl w-full border-2 border-yellow-500 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]': 'md:grid-cols-2'}`}>
            <Sidebar />
            <ChatContainer/>
            <Rightsidebar />
      </div>
    </div>

  )
}

export default Homepages

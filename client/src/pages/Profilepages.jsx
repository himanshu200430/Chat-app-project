import React, { useState , useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/chat-app-assets/assets'
import { Authcontext } from '../../context/Authcontext'

const Profilepages = () => {

  const {authUser,updateProfile} = useContext(Authcontext)
  const[selectedImg,setselectedImg] = useState(null)
  const navigate = useNavigate()
  const[name,setname] = useState(authUser.fullname)
  const[bio,setbio] = useState(authUser.bio)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullname:name,bio})
      navigate('/')
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({Profilepic:base64Image,fullname:name,bio})
      navigate('/')
    }
  }

  return (
    <div className='backdrop-blur min-h-screen bg-cover flex items-center justify-center'>
      
      <div className='w-5/6 max-w-2xl bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black backdrop-blur-2xl text-gray-300 border-2
       border-amber-600 flex items-center justify-between max-sm:flex-col-reverse
      rounded-lg shadow-xl shadow-black'>
        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-5 p-10 flex-1'>
         <h3 className='text-lg'>Profile Details</h3>
         <label htmlFor="avatar" className='flex items-center gap-3
          cursor-pointer'>
            <input onChange={(e)=>setselectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={!(authUser?.Profilepic) ? (selectedImg ? URL.createObjectURL(selectedImg): assets.avatar_icon): authUser?.Profilepic} alt=""
             className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>
             
            { !(authUser?.Profilepic) ? <h5>Upload Profile Image</h5> : <h5>Change Profile Image</h5>}
             </label>

          <input onChange={(e)=>setname(e.target.value)} value={name}
           type="text" required placeholder='Your name' className='p-2 border bg-gradient-to-r from-black to-red-700 shadow-lg shadow-black border-amber-950 rounded-md focus:outline-none focus:ring-2 
           focus:ring-yellow-700'/>

           <textarea onChange={(e)=>setbio(e.target.value)} value={bio} placeholder='Write profile bio'
           required className='p-2 bg-gradient-to-r from-black to-red-700   border-amber-950 shadow-lg shadow-black rounded-md focus:outline-none
           focus:ring-2 focus:ring-yellow-600' rows={4} name="" id=""></textarea>
           <button type='submit' className='bg-gradient-to-r from-yellow-500 to-yellow-700 text-black border-amber-950 p-2 rounded-full 
           text-lg cursor-pointer shadow-lg shadow-black'>Save</button>

        </form>
        <img className={`max-w-44 aspect-square shadow-lg shadow-black rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={authUser?.Profilepic||'./chat.png' } alt="" />

      </div>
    </div>
  )
}

export default Profilepages

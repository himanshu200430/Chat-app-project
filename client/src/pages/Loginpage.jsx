import React, { useState } from 'react'
import assets from '../assets/chat-app-assets/assets'
import { Authcontext } from '../../context/Authcontext'
import { useContext } from 'react'
import { MessageCircle } from 'lucide-react'
import { User } from 'lucide-react'

const Loginpage = () => {

const[curstate,setcurstate] = useState("Sign Up")
const[fullName, setfullName] = useState("")
const[email,setemail] = useState("")
const[password,setpassword] = useState("")
const[bio,setbio] = useState("")
const[isDataSubmitted,setisDataSubmitted] = useState(false)
const {login} = useContext(Authcontext);
const onSubmitHandler = (event)=>{
  event.preventDefault();
  if(curstate === "Sign Up" && !isDataSubmitted){
    setisDataSubmitted(true)
    return;
  }
  login(curstate === "Sign Up" ? "signup" : "login",{ fullname:fullName,email,password,bio})
}
  return (
    <div className='backdrop-blur-lg min-h-screen flex gap-4 sm:justify-evenly max-sm:flex-col items-center py-30'>
    
      
      <form onSubmit={onSubmitHandler} className='border-2 bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black
        backdrop-blur-xl shadow-xl shadow-black text-white border-yellow-400  p-6 flex flex-col gap-6 rounded-lg'>
        <h2 className='font-md text-3xl flex
         justify-center text-amber-400  items-center'>
         {curstate}
         {isDataSubmitted && <img onClick={()=>setisDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
        </h2>
        {curstate == "Sign Up" && !isDataSubmitted && (
        <input onChange={(e) => setfullName(e.target.value)} value={fullName}
         type="text" className='p-3  bg-gradient-to-r from-black to-red-700 rounded-md  outline-amber-400' placeholder='Full Name' required/>
         )}
         {!isDataSubmitted && (
          <>
          <input onChange={(e) => setemail(e.target.value)} value={email}
           type="email" placeholder='Email Address' required 
          className='p-3  bg-gradient-to-r from-black to-red-700 rounded-md outline-amber-400'/>
          <input onChange={(e) => setpassword(e.target.value)} value={password}
           type="password" placeholder='Password' required 
          className='p-3   bg-gradient-to-r from-black to-red-700 rounded-md outline-amber-400'/>
          </>
         )}

         {curstate === "Sign Up" && isDataSubmitted &&(
          <textarea onChange={(e) => setbio(e.target.value)} value={bio} rows={4} name="" className='p-2 border border-yellow-500
          rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-900'
          placeholder='Provide a short bio...' required></textarea>
         )}

         <button type='submit' className='py-3 bg-yellow-500 text-black rounded-2xl 
         cursor-pointer'>
          {curstate === "Sign Up" ? "Create Account" : "Login Now"}
         </button>

         <div>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
         </div>

         <div>
          {curstate === "Sign Up" ? (
            <p className='text-sm text-gray-400'>Already have an account? <span className='font-medium text-yellow-500 cursor-pointer'
            onClick={()=>{setcurstate("Login"); setisDataSubmitted(false)}}>Click here</span></p>

          ) : (
            <p className='text-sm text-gray-400'>Create an account <span
            onClick={()=>setcurstate("Sign Up")} className='font-medium text-yellow-600 cursor-pointer'>Click here</span></p>

     
          )}
         </div>
      </form>
      <div className='flex flex-col gap-7 justify-center items-center'>
        <h1 className='text-7xl text-amber-400 text-shadow-black text-shadow-lg max-sm:text-4xl'>Welcome To Chatzee</h1>
        <div className='flex gap-5  max-sm:justify-center max-sm:items-center max-sm:flex-col'><div className='border-2 w-50 h-50 rounded-2xl border-amber-400 bg-gradient-to-r 
        from-red-900 
        via-red-500 
        to-black backdrop-blur-lg flex flex-col justify-center items-center gap-5 shadow-lg shadow-black max-sm:w-60'><MessageCircle size={54} color='yellow' fill='yellow' stroke='red' /><h1 className='text-amber-400 text-shadow-lg text-shadow-black
         text-lg'>Real time chat</h1></div><div className='border-2 w-50 h-50 rounded-2xl border-amber-400 bg-gradient-to-r 
         from-red-900 
         via-red-500 
         to-black backdrop-blur-lg flex flex-col justify-center items-center gap-5 shadow-lg shadow-black max-sm:w-60'><User size={54} color='yellow' fill='yellow' stroke='red' /><h1 className='text-amber-400 text-shadow-lg text-shadow-black
          text-lg'>Maintain Profile</h1></div></div>
      </div>

      </div>
  
  )
}

export default Loginpage

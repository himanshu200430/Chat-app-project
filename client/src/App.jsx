import React, { useContext, lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Homepages from './pages/Homepages'
import Loginpage from './pages/Loginpage'
import Profilepages from './pages/Profilepages'
import { Toaster } from 'react-hot-toast'
import { Authcontext } from '../context/Authcontext'

const App = () => {
  const { authUser } = useContext(Authcontext)
  const LazyBalatro = lazy(() => import('./Animation/Balatro'));
  const LazyHomepages = lazy(() => import('./pages/Homepages'));
  const LazyLoginpage = lazy(() => import('./pages/Loginpage'));
  const LazyProfilepages = lazy(() => import('./pages/Profilepages'));


  // Poori App ke liye Loading Screen
  const FullScreenLoader = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black', // Ya koi bhi dark color jo aapke design se match kare
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      zIndex: 9999, // Sabse upar dikhega
    }}>
      <p>Loading CHATZEE...</p>
      {/* Yahan aap ek Spinner ya koi aur simple animation bhi dal sakte hain */}
    </div>
  );
  return (
    <div className="app-container">
      <div style={{ width: '100%', minheight: '100vh', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%', //
        }}>
          <Suspense fallback={
            // Jab tak Balatro load nahi hota, yeh div dikhega
            <div style={{
              
            }}>
              Loading Animation...
            </div>
          }>
            <LazyBalatro
              isRotate={false}
              mouseInteraction={true}
              pixelFilter={700}
            />
          </Suspense>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>

          <Toaster />
          <Routes>
            <Route path='/' element={authUser ? <Homepages /> : <Navigate to="/login" />} />
            <Route path='/login' element={authUser ? <Navigate to="/" /> : <Loginpage />} />
            <Route path='/profile' element={authUser ? <Profilepages /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App

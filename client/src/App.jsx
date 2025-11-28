import React, { useContext, useRef, useEffect, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Loginpage from "./pages/Loginpage";
import Profilepages from "./pages/Profilepages";
import { Toaster } from "react-hot-toast";
import { Authcontext } from "../context/Authcontext";
import { gsap } from "gsap";

// Background animation
const Balatro = lazy(() => import("./Animation/Balatro"));

const App = () => {
  const { authUser } = useContext(Authcontext);
  const uiRef = useRef(null);

  // 🌟 KEY CHANGE: uiAnimate starts at FALSE.
  // The UI will remain hidden until this is set to true by Balatro.
  const [uiAnimate, setUiAnimate] = React.useState(false); 

  // Function to be called by Balatro when it is fully loaded.
  const handleBgLoadComplete = () => {
    // This is the trigger!
    setUiAnimate(true);
  };

  useEffect(() => {
    // This animation runs ONLY when uiAnimate becomes true (i.e., Balatro is loaded).
    if (uiAnimate && uiRef.current) {
      gsap.fromTo(
        uiRef.current,
        // FROM: Start completely invisible and slightly lower
        { opacity: 0, y: 30 }, 
        // TO: Fade in over 1 second, settle at final position
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" } 
      );
    }
  }, [uiAnimate]);

  return (
    <div className="app-container relative w-full min-h-screen">

      {/* ---------- BACKGROUND ANIMATION (Flicker Fix Applied) ---------- */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <Suspense
          fallback={
            // Solid black background to prevent white flickering
            <div className="flex flex-col items-center justify-center h-full bg-black backdrop-blur-sm text-white">
              <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
              <p className="mt-3 text-lg opacity-80">Preparing your experience…</p>
            </div>
          }
        >
          {/* Balatro MUST call handleBgLoadComplete when it finishes loading */}
          <Balatro onLoadComplete={handleBgLoadComplete} /> 
        </Suspense>
      </div>

      {/* ---------- MAIN UI (Hidden until Balatro is loaded) ---------- */}
      {/* Initial opacity is 0 to keep it hidden before animation */}
      <div 
          ref={uiRef} 
          className="app-ui relative z-10"
          style={{ opacity: 0 }} 
      >
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepages /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Loginpage />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profilepages /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

    </div>
  );
};

export default App;
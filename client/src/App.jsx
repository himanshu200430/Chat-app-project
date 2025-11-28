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

  // Background mount only once
  const [bgMounted, setBgMounted] = React.useState(false);
  // UI fade-in trigger
  const [uiAnimate, setUiAnimate] = React.useState(false);

  useEffect(() => {
    if (!bgMounted) setBgMounted(true);
  }, [bgMounted]);

  // Trigger GSAP animation once background is ready
  const handleBgLoadComplete = () => {
    setUiAnimate(true);
  };

  useEffect(() => {
    if (uiAnimate && uiRef.current) {
      gsap.fromTo(
        uiRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
    }
  }, [uiAnimate]);

  return (
    <div className="app-container relative w-full min-h-screen">

      {/* ---------- BACKGROUND ANIMATION ---------- */}
      {bgMounted && (
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm text-white">
                <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                <p className="mt-3 text-lg opacity-80">Preparing your experience…</p>
              </div>
            }
          >
            <Balatro onLoadComplete={handleBgLoadComplete} />
          </Suspense>
        </div>
      )}

      {/* ---------- MAIN UI (always render, animate when ready) ---------- */}
      <div ref={uiRef} className="app-ui relative z-10">
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

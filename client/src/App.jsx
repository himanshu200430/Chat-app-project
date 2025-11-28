import React, { useContext, useRef, useEffect, lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Loginpage from "./pages/Loginpage";
import Profilepages from "./pages/Profilepages";
import { Toaster } from "react-hot-toast";
import { Authcontext } from "../context/Authcontext";
import { gsap } from "gsap";

// Balatro is a component, we render it inside Suspense
const Balatro = lazy(() => import("./Animation/Balatro"));

const App = () => {
  const { authUser } = useContext(Authcontext);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // Thoda delay UI smoothness ke liye
    const timer = setTimeout(() => setAnimationReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container relative w-full min-h-screen">

      {/* ---------------- BACKGROUND ANIMATION ---------------- */}
      <div
        className="fixed inset-0 -z-10 w-full h-full overflow-hidden"
      >
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm text-white">
              <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
              <p className="mt-3 text-lg opacity-80">Preparing your experience…</p>
            </div>
          }
        >
          {/* Balatro component render hoga */}
          <Balatro />
        </Suspense>
      </div>

      {/* ---------------- MAIN UI ---------------- */}
      {animationReady && (
        <div className="app-ui relative z-10 backdrop-blur-lg ">
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
      )}

      {/* ---------------- GLOBAL ANIMATION ---------------- */}
      <style>{`
        .app-ui {
          opacity: 0;
          animation: fadeInUp 0.7s ease-out forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default App;

// App.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBarBeforeLogin from "./components/NavBarBeforeLogin";
import NavBarAfterLogin from "./components/NavBarAfterLogin";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeBuilder from "./pages/ResumeBuilder";
import MyResumes from "./pages/MyResume";
import Premium from "./pages/Primium"; // added Premium page
import HomeBeforeLogin from "./pages/HomeBeforeLogin";
import HomeAfterLogin from "./pages/AfterLoginHome";
import AI from "./pages/Ai"; // AI Assistant page
import Templates from "./pages/Template";
//import Features from "./pages/Features";

// Protected route wrapper component
function PrivateRoute({ children, redirectTo = "/login" }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to={redirectTo} replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update login status based on token presence
  const updateLoginStatus = useCallback(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  // Initialize login state & listen for storage changes
  useEffect(() => {
    updateLoginStatus();
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, [updateLoginStatus]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Navbar based on login state */}
      {isLoggedIn ? (
        <NavBarAfterLogin onLogout={handleLogout} />
      ) : (
        <NavBarBeforeLogin />
      )}

      <div className="pt-16">
        <Routes>
          {/* Home page conditional */}
          <Route
            path="/"
            element={isLoggedIn ? <HomeAfterLogin /> : <HomeBeforeLogin />}
          />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/resume-builder"
            element={
              <PrivateRoute>
                <ResumeBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-resumes"
            element={
              <PrivateRoute>
                <MyResumes />
              </PrivateRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <PrivateRoute>
                <Premium />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai"
            element={
              <PrivateRoute>
                <AI />
              </PrivateRoute>
            }
          />
           <Route
            path="/templates"
            element={
              <PrivateRoute>
                <Templates/>
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount and when route changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]); // <-- rerun when URL changes

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center fixed top-0 left-0 w-full shadow-lg z-50">
      <Link
        to="/"
        className="text-xl font-bold text-white hover:text-green-400 transition"
      >
        MyApp
      </Link>

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/resume-builder"
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded transition"
            >
              Resume Builder
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

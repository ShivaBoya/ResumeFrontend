import { Link } from "react-router-dom";

function NavBarBeforeLogin() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center fixed top-0 left-0 w-full shadow-lg z-50">
      <Link
        to="/home"
        className="text-xl font-bold text-white hover:text-green-400 transition"
      >
        Resume
      </Link>
      {/* <div className="flex items-center gap-4">
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
      </div> */}
    </nav>
  );
}

export default NavBarBeforeLogin;

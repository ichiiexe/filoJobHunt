import { Link } from "react-router-dom";
import logo from "../assets/ignite-logo.png";

import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { currUser, logout } = useAuth();

  return (
    <nav className="sticky top-0 left-0 z-50 w-full flex items-center justify-center text-gray-100 shadow-2xl bg-gray-800/80 dark:bg-gray-800/80 backdrop-blur-lg">
      <div className="flex justify-between items-center w-full max-w-7xl px-4">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img src={logo} alt="FiloJobHunt Logo" className="h-16 w-16" />
          <h1 className="text-4xl font-extrabold text-white">siklab</h1>
        </Link>
        <ul className="flex space-x-8 opacity-70 font-light hover:opacity-100 transition">
          <li>
            <Link to="/jobs" className="hover:text-blue-400 transition">
              Find Jobs
            </Link>
          </li>
          {currUser && (
            <li>
              <Link to="/post-job" className="hover:text-blue-400 transition">
                Post a Job
              </Link>
            </li>
          )}
          <li>
            <Link to="/companies" className="hover:text-blue-400 transition">
              Find Candidates
            </Link>
          </li>
        </ul>
        {currUser ? (
          <div className="flex space-x-4">
            <Link
              to="/profile"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              {currUser?.fullname}
            </Link>
            <button
              onClick={logout}
              className="text-gray-300 hover:text-red-400 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-2xl transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

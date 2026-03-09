import { Link } from "react-router-dom";
import logo from "../assets/ignite-logo.png";

import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { token, currUser, logout } = useAuth();

  return (
    <nav className="flex justify-center items-center text-black shadow-2xs sticky top-0 left-0 w-full bg-transparent backdrop-blur-sm">
      <div className="flex justify-between items-center w-full max-w-400">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl">siklab</h1>
          <img src={logo} alt="FiloJobHunt Logo" className="h-16 w-16" />
        </div>
        <ul className="flex space-x-8 opacity-60 font-light">
          <li>
            <a href="/">Find Jobs</a>
          </li>
          <li>
            <a href="/jobs">Post a Job</a>
          </li>
          <li>
            <a href="/companies">Find Candidates</a>
          </li>
        </ul>
        {token ? (
          <div className="flex space-x-4">
            <button className=" hover:text-gray-300 cursor-pointer">
              {currUser?.fullname}
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              href="/login"
              className=" hover:text-gray-300 cursor-pointer"
            >
              Sign In
            </button>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-2xl cursor-pointer"
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

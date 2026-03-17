import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { User, Building2, ChevronLeft } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { currUser, login } = useAuth();
  const token = localStorage.getItem("token") || currUser?.token;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(form);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="flex h-dvh bg-gray-900 flex-col justify-center items-center gap-10 w-full">
      <div className="relative max-w-4xl mx-auto bg-gray-800 dark:bg-gray-800 p-8 rounded shadow flex flex-col items-center gap-6 w-full border border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-100">
            Login to an Account
          </h1>
          <p className="text-gray-400 mt-2">
            Login to an account to apply for jobs or post a job.
          </p>
        </div>
        <form className="w-full flex" onSubmit={handleSubmit}>
          {token ? (
            <Navigate to="/jobs" />
          ) : (
            <>
              <div>
                <label className="block mb-1 text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border border-gray-600 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <label className="block mb-1 mt-4 text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border border-gray-600 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              {error && <p className="text-red-400 mt-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition mt-4"
              >
                Login
              </button>
            </>
          )}
        </form>
        <div className="flex items-center space-x-2 text-gray-300">
          <p>Don't have an account?</p>
          <Link
            className="text-blue-400 underline hover:text-blue-300 transition"
            to="/register"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

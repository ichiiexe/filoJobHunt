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

    console.log(form);

    try {
      await login(form);
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="h-dvh w-full bg-red-500 flex flex-col justify-center items-center gap-10">
      <div className="w-full relative max-w-4xl mx-auto bg-white p-8 rounded shadow flex flex-col justify-center items-center gap-6">
        <div className="text-center">
          <h1>Login to an Account</h1>
          <p>Login to an account to apply for jobs or post a job.</p>
        </div>
        <form className="w-full flex" onSubmit={handleSubmit}>
          {token ? (
            <Navigate to="/dashboard" />
          ) : (
            <>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter your email"
                />
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter your password"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Login
              </button>
            </>
          )}
        </form>
        <div className="flex items-center space-x-2">
          <p>Dont have an account?</p>
          <Link
            className="text-blue-500 underline hover:text-blue-700"
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Building2, ChevronLeft } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: null,
  });
  const [error, setError] = useState("");

  const { currUser, register } = useAuth();
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

    if (form.password !== form.confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const { confirmpassword, ...data } = form;

    const result = await register(data);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="flex h-dvh bg-gray-900 flex-col justify-center items-center gap-10 w-full">
      <div className="relative max-w-4xl mx-auto bg-gray-800 dark:bg-gray-800 p-8 rounded shadow flex flex-col items-center gap-6 w-full border border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-100">
            Create an Account
          </h1>
          <p className="text-gray-400 mt-2">
            Create an account to apply for jobs or post a job.
          </p>
        </div>
        <form className="w-full flex" onSubmit={handleSubmit}>
          {!token ? (
            !form.role ? (
              <>
                <button
                  className="flex flex-col items-center gap-4 flex-1 p-6 rounded hover:bg-gray-700 dark:hover:bg-gray-700 duration-75 text-gray-100"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, role: "jobseeker" }))
                  }
                >
                  <h1 className="text-xl font-semibold">Job Seeker</h1>
                  <User className="h-20 w-20" />
                </button>
                <div className="w-px h-full bg-gray-600 mx-4" />
                <button
                  className="flex flex-col items-center gap-4 flex-1 p-6 rounded hover:bg-gray-700 dark:hover:bg-gray-700 duration-75 text-gray-100"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, role: "company" }))
                  }
                >
                  <h1 className="text-xl font-semibold">Company</h1>
                  <Building2 className="h-20 w-20" />
                </button>
              </>
            ) : (
              <div className="w-full max-w-md mx-auto">
                <div
                  className="absolute top-3 left-2 flex items-center gap-1 cursor-pointer text-gray-300 hover:text-gray-100 transition"
                  onClick={() => setForm((prev) => ({ ...prev, role: null }))}
                >
                  <ChevronLeft />
                  <h1 className="text-lg font-semibold">Back</h1>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-300">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    className="w-full border border-gray-600 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  <label className="block mb-1 mt-3 text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full border border-gray-600 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-300">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full border border-gray-600 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-1">{error}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    onChange={handleChange}
                    className="w-full border border-gray-600 bg-gray-700 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Confirm your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition mt-4 font-medium\"
                >
                  Register
                </button>
              </div>
            )
          ) : (
            <>Complete setup</>
          )}
        </form>
        <div className="flex items-center space-x-2 text-gray-300\">
          <p>Already have an account?</p>
          <Link
            className="text-blue-400 underline hover:text-blue-300 transition\"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

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

    try {
      await register(data);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-dvh w-full bg-red-500 flex flex-col justify-center items-center gap-10">
      <div className="w-full relative max-w-4xl mx-auto bg-white p-8 rounded shadow flex flex-col justify-center items-center gap-6">
        <div className="text-center">
          <h1>Create an Account</h1>
          <p>Create an account to apply for jobs or post a job.</p>
        </div>
        <form className="w-full flex" onSubmit={handleSubmit}>
          {!token ? (
            !form.role ? (
              <>
                <button
                  className="flex flex-col items-center gap-4 flex-1 p-6 rounded cursor-pointer hover:bg-gray-50 duration-75"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, role: "jobseeker" }))
                  }
                >
                  <h1>Job Seeker</h1>
                  <User className="h-20 w-20" />
                </button>
                <div className="w-px h-full bg-gray-300 mx-4" />
                <button
                  className="flex flex-col items-center gap-4 flex-1 p-6 rounded cursor-pointer hover:bg-gray-50 duration-75"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, role: "company" }))
                  }
                >
                  <h1>Company</h1>
                  <Building2 className="h-20 w-20" />
                </button>
              </>
            ) : (
              <div className="w-full max-w-md mx-auto">
                <div
                  className="absolute top-3 left-2 flex items-center justify-center gap-1 cursor-pointer"
                  onClick={() => setForm((prev) => ({ ...prev, role: null }))}
                >
                  <ChevronLeft />
                  <h1 className="text-lg font-semibold">Back</h1>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter your full name"
                  />
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter your password"
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Confirm your password"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Register
                </button>
              </div>
            )
          ) : (
            <>Complete setup</>
          )}
        </form>
        <div className="flex items-center space-x-2">
          <p>Already have an account?</p>
          <Link
            className="text-blue-500 underline hover:text-blue-700"
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

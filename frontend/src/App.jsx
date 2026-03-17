import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import PostJobs from "./pages/PostJobs";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="dark bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/companies" element={<h1>Companies Page</h1>} />
      </Routes>
    </div>
  );
}

export default App;

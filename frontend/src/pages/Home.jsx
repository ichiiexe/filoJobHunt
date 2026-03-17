import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";
import JobList from "../components/JobList";

const Home = () => {
  return (
    <div className="home-container mx-auto bg-gray-900 min-h-screen">
      <main className="py-10 flex flex-col items-center justify-center text-center gap-8">
        <p className="bg-yellow-600/40 text-yellow-300 py-2 px-4 rounded-full text-sm font-medium">
          The #1 Job Portal for Filipinos
        </p>
        <h1 className="text-6xl font-bold text-gray-100">
          Find your <span className="text-blue-400">Dream Job</span>
          <br />
          <span className="text-red-500">Today</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Connect with top companies in the Philippines and abroad. Start your
          career journey now!
        </p>

        <div className="w-full flex flex-col items-center justify-center">
          <SearchBar />
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-md text-gray-400">
            <span>Popular:</span>
            <Link className="text-blue-400 hover:text-blue-300 transition">
              Call Center
            </Link>
            <span>•</span>
            <Link className="text-blue-400 hover:text-blue-300 transition">
              Developer
            </Link>
            <span>•</span>
            <Link className="text-blue-400 hover:text-blue-300 transition">
              Nurse
            </Link>
            <span>•</span>
            <Link className="text-blue-400 hover:text-blue-300 transition">
              OFW Jobs
            </Link>
            <span>•</span>
            <Link className="text-blue-400 hover:text-blue-300 transition">
              Work from Home
            </Link>
          </div>
        </div>
      </main>
      <section></section>

      <Footer />
    </div>
  );
};

export default Home;

import Navbar from "../components/navbar";
import SearchBar from "../components/searchbar";
import Footer from "../components/footer";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container x-auto">
      <main className="py-10 flex items-center justify-center flex-col text-center gap-8 ">
        <p className="bg-amber-200 py-2 px-4 rounded-4xl">
          The #1 Job Portal for Filipinos
        </p>
        <h1 className="text-6xl font-bold">
          Find your <span className="text-blue-600">Dream Job</span>
          <br />
          <span className="text-red-700">Today</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Connect with top companies in the Philippines and abroad. Start your
          career journey now!
        </p>

        <div className="w-full flex justify-center flex-col items-center">
          <SearchBar />
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-md">
            <span>Popular:</span>
            <Link className="hover:text-blue">Call Center</Link>
            <span>•</span>
            <Link className="hover:text-blue">Developer</Link>
            <span>•</span>
            <Link className="hover:text-blue">Nurse</Link>
            <span>•</span>
            <Link className="hover:text-blue">OFW Jobs</Link>
            <span>•</span>
            <Link className="hover:text-blue">Work from Home</Link>
          </div>
        </div>
      </main>
      <section></section>

      <Footer />
    </div>
  );
};

export default Home;

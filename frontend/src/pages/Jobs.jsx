import SearchBar from "../components/SearchBar";
import JobFilters from "../components/Filters";
import JobList from "../components/JobList";
import { useState } from "react";

const Jobs = () => {
  const [filters, setFilters] = useState({});

  return (
    <main className="flex flex-col items-center p-4 gap-8 bg-gray-900 min-h-screen">
      <section className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-6">Find Jobs</h1>
        <SearchBar onSearch={setFilters} />
      </section>
      <section className="flex gap-8 w-full max-w-7xl">
        <JobFilters filters={filters} setFilters={setFilters} />
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-100">Jobs found</h1>
          <JobList filters={filters} />
        </div>
      </section>
    </main>
  );
};

export default Jobs;

import { useEffect, useState } from "react";
import { getJobs } from "../api/jobsApi";
import { useAuth } from "../hooks/useAuth";
import JobCard from "./JobCard";

const JobList = ({ filters = {} }) => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currUser } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await getJobs(filters);
        setJobList(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  if (loading)
    return (
      <div className="text-gray-400 text-center py-8">Loading jobs...</div>
    );
  if (error)
    return <div className="text-red-400 text-center py-8">Error: {error}</div>;

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {jobList.length > 0 ? (
        jobList.map((job) => (
          <JobCard key={job._id} job={job} currentUser={currUser} />
        ))
      ) : (
        <p className="text-gray-400 text-center py-8">No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;

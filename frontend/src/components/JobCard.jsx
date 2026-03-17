import {
  Bookmark,
  MapPin,
  DollarSign,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";
import { deleteJob } from "../api/jobsApi";

const JobCard = ({ job, currentUser }) => {
  const posterType = job.postedBy?.role === "recruiter" ? "company" : "user";

  const canEdit =
    currentUser &&
    (currentUser.role === "admin" || currentUser.id === job.postedBy?._id);

  const canDelete =
    currentUser &&
    (currentUser.role === "admin" || currentUser.id === job.postedBy?._id);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(job._id);
        window.location.reload();
      } catch (error) {
        alert("Failed to delete job: " + error.message);
      }
    }
  };

  return (
    <div className="border border-gray-700 bg-gray-800 dark:bg-gray-800 p-8 rounded-lg flex items-start gap-5 hover:border-gray-600 transition">
      <h1 className="text-2xl bg-red-500 dark:bg-red-600 text-white py-2 px-3 rounded-lg font-bold">
        TC
      </h1>
      <div className="flex flex-col gap-4 flex-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-100">
              {job.title}
            </h2>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                posterType === "company"
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-green-900/40 text-green-300"
              }`}
            >
              {posterType}
            </span>
          </div>
          <p className="opacity-50 text-gray-400">{job.company}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded-md text-sm">
            {job.jobType}
          </span>
          <span className="bg-green-900/40 text-green-300 px-2 py-1 rounded-md text-sm">
            {job.locationType}
          </span>
          <span className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded-md text-sm">
            {job.experienceLevel}
          </span>
        </div>
        <div className="flex gap-4 opacity-70 font-light text-gray-400 flex-wrap">
          <div className="flex gap-1 items-center">
            <MapPin className="w-5 h-5" />
            <h1>{job.location}</h1>
          </div>
          <div className="flex gap-1 items-center">
            <DollarSign className="w-5 h-5" />
            <h1>{job.salary}</h1>
          </div>
          <div className="flex gap-1 items-center">
            <Clock className="w-5 h-5" />
            <h1>{new Date(job.createdAt).toLocaleDateString()}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {canEdit && (
          <button className="p-2 text-blue-400 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition">
            <Edit className="w-5 h-5" />
          </button>
        )}
        {canDelete && (
          <button
            onClick={handleDelete}
            className="p-2 text-red-400 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        <button className="p-2 text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;

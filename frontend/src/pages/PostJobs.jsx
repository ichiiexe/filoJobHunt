import { useState } from "react";
import {
  Briefcase,
  X,
  Building2,
  FileText,
  CircleCheckBig,
} from "lucide-react";
import { createJob } from "../api/jobsApi";

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    experienceLevel: "",
    jobType: "",
    salary: "",
    locationType: "onsite",
    location: "Athens, Greece",
    skillsRequired: [],
    tags: [],
    company: "",
  });

  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const isRemote = formData.locationType === "remote";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleAddSkill = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const skill = skillInput.trim();
      if (skill && !formData.skillsRequired.includes(skill)) {
        setFormData((prev) => ({
          ...prev,
          skillsRequired: [...prev.skillsRequired, skill],
        }));
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((s) => s !== skill),
    }));
  };

  const handleAddTag = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tag],
        }));
        setTagInput("");
      }
    }
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleRemoteCheck = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      locationType: checked ? "remote" : "onsite",
      location: checked ? "remote" : prev.location,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.experienceLevel ||
      !formData.jobType
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      await createJob(formData);
      setError("");
      setFormData({
        title: "",
        description: "",
        category: "",
        experienceLevel: "",
        jobType: "",
        salary: "",
        locationType: "onsite",
        location: "Athens, Greece",
        skillsRequired: [],
        tags: [],
        company: "",
      });
      setSkillInput("");
      setTagInput("");
      alert("Job posted successfully!");
    } catch (err) {
      setError(err.message || "Failed to post job. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-gray-900 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-100">Post a Job</h1>
        <p className="text-gray-400 mt-2">
          Find the perfect candidate for your position
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-5 w-full max-w-4xl"
      >
        <div className="flex flex-col w-full gap-4">
          <div className="border border-gray-700 bg-gray-800 dark:bg-gray-800 p-8 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase />
              <h2 className="text-lg font-semibold text-gray-100">
                Job Details
              </h2>
            </div>
            <label htmlFor="title" className="block text-gray-300 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded w-full mb-4 focus:outline-none focus:border-blue-500"
            />

            <div className="flex gap-6">
              <div className="flex flex-col space-y-2 flex-1">
                <label htmlFor="category" className="text-gray-300">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Engineering">Engineering</option>
                </select>

                <label htmlFor="experienceLevel" className="text-gray-300 mt-4">
                  Experience level *
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select experience level</option>
                  <option value="No experience">No experience</option>
                  <option value="With experience">With experience</option>
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 flex-1">
                <label htmlFor="jobType" className="text-gray-300">
                  Employment Type *
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                  <option value="unknown">Unknown</option>
                </select>

                <label htmlFor="salary" className="text-gray-300 mt-4">
                  Salary *
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-700 bg-gray-800 dark:bg-gray-800 p-8 rounded-lg space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Building2 />
              <h2 className="text-lg font-semibold text-gray-100">
                Company & Location
              </h2>
            </div>

            <label htmlFor="company" className="text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <div className="flex flex-col">
              <label className="text-gray-300">Location Type</label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {[
                  { label: "Live-In", value: "live-in" },
                  { label: "Onsite", value: "onsite" },
                  { label: "Remote", value: "remote" },
                  { label: "Hybrid", value: "hybrid" },
                  { label: "Unknown", value: "unknown" },
                ].map((type) => (
                  <button
                    type="button"
                    key={type.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        locationType: type.value,
                      }))
                    }
                    className={`px-4 py-2 rounded border transition ${
                      formData.locationType === type.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-700 text-gray-200 border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="remoteCheck"
                checked={isRemote}
                onChange={handleRemoteCheck}
                className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
              />
              <label htmlFor="remoteCheck" className="text-gray-300">
                This is a remote position
              </label>
            </div>

            {!isRemote && (
              <>
                <label htmlFor="location" className="mt-2 block text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded w-full focus:outline-none focus:border-blue-500"
                />
              </>
            )}
          </div>

          <div className="mt-4 border border-gray-700 bg-gray-800 dark:bg-gray-800 p-8 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FileText />
              <h2 className="text-lg font-semibold text-gray-100">
                Job Description
              </h2>
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job description"
              className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded w-full focus:outline-none focus:border-blue-500 mb-4"
            />
            <div className="flex flex-col">
              <label className="text-gray-300">Skills Required</label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Press Enter or comma to add"
                className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded w-full mt-2 focus:outline-none focus:border-blue-500"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <X
                      size={16}
                      className="ml-1 cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300">Tags</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Press Enter or comma to add"
                className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded w-full mt-2 focus:outline-none focus:border-blue-500"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center bg-green-900/40 text-green-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <X
                      size={16}
                      className="ml-1 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-6 py-2 rounded-lg transition flex items-center border border-gray-600">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition flex items-center"
          >
            <CircleCheckBig className="inline-block mr-2 w-5 h-5" />
            Post Job
          </button>
        </div>
        {error && <p className="text-red-400 mt-4 font-medium">{error}</p>}
      </form>
    </div>
  );
};

export default PostJobs;

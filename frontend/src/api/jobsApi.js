import api from "./api";

export const createJob = async (jobData) => {
  const response = await api.post("/api/jobs", jobData);
  return response.data;
};

export const getJobs = async (filters = {}) => {
  const response = await api.get("/api/jobs", { params: filters });
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/api/jobs/${id}`);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.put(`/api/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/api/jobs/${id}`);
  return response.data;
};

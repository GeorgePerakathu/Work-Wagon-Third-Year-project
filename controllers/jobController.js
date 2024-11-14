import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job: updatedJob });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job: removedJob });
};


export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req, res) => {
  const { search,  jobType } = req.query;
  const params = {};

  if (search) {
    params.jobPincode = search;
  }

  if (jobType && jobType !== "all") {
    params.sitename = jobType;
  }
  const jobs = await Job.find(params); 
  res.status(StatusCodes.OK).json({ jobs });
};












export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};

export const getSpecJob = async (req, res) => {
  try {
    const user = req.user;
    const jobs = await Job.find({ createdBy: user._id });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ msg: `No jobs found for the user` });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

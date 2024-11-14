import mongoose from "mongoose";

const JobApplicantsSchema = new mongoose.Schema({
  jobId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  uin: {
    type: String,
    required: true,
  },
  jobName: {
    type: String,
  },
  jobRole: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Accepted"],
    default: "Pending",
  },
});

const JobApplicants = mongoose.model("JobApplicants", JobApplicantsSchema);

export default JobApplicants;

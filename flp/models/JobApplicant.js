// db.js
import mongoose from "mongoose";

const jobApplicantSchema = new mongoose.Schema({
  name: String,
  uin: String,
  // ... add other fields as needed
});

const JobApplicants = mongoose.model('JobApplicants', jobApplicantSchema);

export default JobApplicants;

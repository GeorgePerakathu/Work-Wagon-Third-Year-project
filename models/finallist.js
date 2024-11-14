import mongoose from "mongoose";

const finalApplicantsSchema = new mongoose.Schema({
  jobId: {
    type: Number,
  },
  jobName: {
    type: String,
  },
  jobRole: {
    type: String,
  },
  price: {
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
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const finalApplicants = mongoose.model("finalApplicants", finalApplicantsSchema);

export default finalApplicants;

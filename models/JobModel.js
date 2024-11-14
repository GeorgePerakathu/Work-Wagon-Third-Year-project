import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
const JobSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      default: function () {
        return Math.floor(10000 + Math.random() * 90000);
      },
      unique: true, 
    },
    sitename: String,
    description: String,
    jobrole: String,
    jobLocation: {
      type: String,
      default: "my city",
    },
    jobPincode: {
      type: Number,
    },
    price: {
      type: Number,
    },
    images: [
      {
        type: String, // Store the path to the uploaded image
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Job", JobSchema);

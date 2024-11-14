import mongoose from "mongoose";

const checkSchema = new mongoose.Schema(
  {
    TrackId: {
      type: Number,
    },
    budget: {
      type: Number,
    },
    jobId: {
      type: Number,
    },
    Result: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CheckModel = mongoose.model("check", checkSchema);

export default CheckModel;

import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    TrackId: {
      type: Number,
      default: function () {
        return Math.floor(10000 + Math.random() * 90000);
      },
      unique: true,
    },
    projectTitle: {
      type: String,
    },
    projectDescription: {
      type: String,
    },
    deadline: {
      type: String,
    },
    budget: {
      type: Number,
    },
    designPreference: {
      type: String,
    },
    additionalInformation: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    jobId: {
      type: Number,
    },
  },
  { timestamps: true }
);

const RequirementModel = mongoose.model("RequireDataflps", requirementSchema);

export default RequirementModel;

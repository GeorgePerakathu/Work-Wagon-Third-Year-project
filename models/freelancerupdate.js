import mongoose from "mongoose";

const updatefree = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      default: function () {
        return Math.floor(10000 + Math.random() * 90000);
      },
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    bio: {
      type: String,
    },
    interests: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    cardImage: [
      {
        type: String,
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    jobtype: { type: String },
    socialMedia: {
      type: String,
    },
    skills: [
      {
        skill: { type: String },
        experience: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        yearOfPassing: { type: String },
      },
    ],
    projects: [
      {
        title: { type: String }, // project name
        description: { type: String },
        githubLink: { type: String },
        liveDemoLink: { type: String },
        image: { type: String },
        photoDescription: { type: String },
      },
    ],
    projectPlans: [
      {
        name: { type: String },
        description: { type: String },
        cost: { type: Number },
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Update",updatefree);
import mongoose from "mongoose";

const BidRegisterSchema = new mongoose.Schema(
  {
    bidId: {
      type: Number,
      default: function () {
        return Math.floor(10000 + Math.random() * 90000);
      },
      unique: true, 
    },
    companyName: {
      type: String,
    },
    requirement: {
      type: String,
    },
    minThreshold: {
      type: Number,
    },
    maxThreshold: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    projectTitle: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    url: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BidRegisterModel = mongoose.model("BidRegisterflps", BidRegisterSchema);

export default BidRegisterModel;

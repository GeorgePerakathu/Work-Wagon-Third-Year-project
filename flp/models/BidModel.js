import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    bidId: {
      type: Number,
    },
    bidAmount: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BidModel = mongoose.model("Bidflps", BidSchema);

export default BidModel;

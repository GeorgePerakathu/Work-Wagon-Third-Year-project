// disputeModel.js
import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema({
  uin: String,
  jobId: Number,
  disputeReason: String,
  disputeDescription: String,
});

const Dispute = mongoose.model('Dispute', disputeSchema);

export default Dispute;
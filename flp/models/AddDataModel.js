import mongoose from "mongoose";

const addDataSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    UIN: {
      type: Number,
      trim: true,
      required: [true, "UIN is required"],
    },
    Job: {
      type: String,
      trim: true,
      required: [true, "Phone is required"],
    },
    Payment: {
      type: Number,
      trim: true,
      required: [true, "UIN is required"],
    },
  },
  { timestamps: true }
);

const AddDataModel = mongoose.model("AddData", addDataSchema);

export default AddDataModel;

import mongoose from "mongoose";

const add_DetailsSchema = new mongoose.Schema(
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
    Phone: {
      type: Number,
      trim: true,
      required: [true, "UIN is required"],
    },
  },
  { timestamps: true }
);

const AddDetailsModel = mongoose.model('AddDetails', add_DetailsSchema);

export default AddDetailsModel;

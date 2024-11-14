import mongoose from "mongoose";

const addDataSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    UIN: {
      type: Number,
    },
    Job_Id: {
      type: Number,
    },
    Job_Name:{
      type:String,
    },
    Job_Role:{
      type:String, 
       },
    Payment: {
      type: Number,
    },
  },
  { timestamps: true }
);

const AddDataModel = mongoose.model("AddData", addDataSchema);

export default AddDataModel;

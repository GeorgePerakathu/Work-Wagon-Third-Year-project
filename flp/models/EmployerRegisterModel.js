import mongoose from "mongoose";

const EmpRegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    companyName: {
      type: String,
    },
    preferences: {
      type: String,
    },
    companySize: {
      type: String,
    },
    phoneNo:{
        type:Number,
    },
    bio:{
        type:String,
    },
    
  },
  { timestamps: true }
);

const EmpRegisterModel = mongoose.model("EmpRegisterflps", EmpRegisterSchema);

export default EmpRegisterModel;

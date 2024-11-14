import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  account: {
    type: String,
    enum: ["Freelancer", "Employer"],
    default: "Freelancer",
  },
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Userflp", UserSchema);

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { String, required: true },
    email: { String, required: true, unique: true },
    password: { String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

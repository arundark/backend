import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 10,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 15,
      undefined: true,
    },
    password: {
      type: String,
      required: true,
      max: 6,
    },
  },
  { timestamps: true }
);

// export const User = userSchema;
export const User = mongoose.model("User", userSchema);

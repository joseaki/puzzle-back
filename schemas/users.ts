import mongoose from "mongoose";

// Define a schema
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

export const User = mongoose.model("User", UserSchema);

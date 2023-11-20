import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  username: { type: String, required: true },
  phone_number: { type: String, required: true },
});

export const User = model("User", UserSchema);

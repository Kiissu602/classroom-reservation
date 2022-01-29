import * as mongoose from "mongoose";

export const ReserveSchema = new mongoose.Schema({
  roomId: String,
  by: {
    type: String,
    required: [true, "please input reserver name"],
  },
  date: {
    type: Date,
    required: [true, "please input Date"],
  },
  start: {
    type: String,
    required: [true, "please input start time"],
  },
  end: {
    type: String,
    required: [true, "please input end time"],
  },
  phone: {
    type: String,
    required: [true, "please input phone number"],
  },

  password: { type: String, required: [true, "please input your password"] },
  email: { type: String, required: [true, "please input your email"] },
  description: String,
  cancelled: {
    type: Boolean,
    default: false,
  },
});

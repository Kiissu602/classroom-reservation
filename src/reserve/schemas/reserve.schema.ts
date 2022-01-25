import * as mongoose from "mongoose";

export const ReserveSchema = new mongoose.Schema({
  roomId: String,
  reservedBy: {
    type: String,
    required: [true, "please input reserver name"],
  },
  reserveDate: {
    type: Date,
    required: [true, "please input Date"],
  },
  start: {
    type: String,
    required: [true, "please input start date"],
  },
  end: {
    type: String,
    required: [true, "please input end date"],
  },
  description: String,
  cancelled: {
    type: Boolean,
    default: false,
  },
});

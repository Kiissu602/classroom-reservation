import * as mongoose from "mongoose";

export const ReserveSchema = new mongoose.Schema({
  roomId: String,
  roomNumber: {
    type: String,
    required: [true, "please input room number"],
  },
  reservedBy: {
    type: String,
    required: [true, "please input reserver name"],
  },
  start: {
    type: Date,
    required: [true, "please input start date"],
  },
  end: {
    type: Date,
    required: [true, "please input end date"],
  },
  description: String,
  cancelled: {
    type: Boolean,
    default: false,
  },
});

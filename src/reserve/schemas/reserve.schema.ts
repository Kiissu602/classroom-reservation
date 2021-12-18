import * as mongoose from "mongoose";

export const ReserveSchema = new mongoose.Schema({
  roomId: String,
  roomNumber: String,
  reservedBy: String,
  start: Date,
  end: Date,
  description: String,
  cancelled: Boolean,
});

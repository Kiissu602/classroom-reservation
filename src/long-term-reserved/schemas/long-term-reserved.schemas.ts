import * as mongoose from "mongoose";

export const LongTermReservedSchema = new mongoose.Schema({
  roomId: String,
  day: [String],
  start: String,
  end: String,
});

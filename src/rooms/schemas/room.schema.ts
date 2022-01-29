import * as mongoose from "mongoose";

export const RoomSchema = new mongoose.Schema({
  number: String,
  quantity: Number,
  type: {
    type: String,
    enum: ["Lecture", "Laboratory"],
    default: "Lecture",
  },
  image: String,
  reserved: [],
});

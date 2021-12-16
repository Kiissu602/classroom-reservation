import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
  number: String,
  quantity: Number,
  size: Number,
});

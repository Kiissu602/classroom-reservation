import { Document } from "mongoose";

export interface LongTermReserved extends Document {
  roomId: string;
  start: string;
  end: string;
  day: string[];
}

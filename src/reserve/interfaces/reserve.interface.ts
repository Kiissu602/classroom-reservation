import { Document } from "mongoose";

export interface Reserve extends Document {
  roomId: string;
  by: string;
  date: Date;
  start: string;
  end: string;
  description: string;
  cancelled: boolean;
  password: string;
}

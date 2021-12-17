import { Document } from "mongoose";

export interface Reserve extends Document {
  roomId: string;
  roomNumber: string;
  reservedBy: string;
  start: Date;
  end: Date;
}

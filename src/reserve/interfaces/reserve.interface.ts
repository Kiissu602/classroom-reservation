import { Document } from "mongoose";

export interface Reserve extends Document {
  roomId: string;
  reservedBy: string;
  reserveDate: Date;
  start: string;
  end: string;
  description: string;
  cancelled: boolean;
}

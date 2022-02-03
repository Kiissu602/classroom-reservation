import { Document } from "mongoose";

export interface Reserve extends Document {
  roomId: string;
  number: string;
  by: string;
  date: Date;
  periods: Period[];
  description: string;
  cancelled: boolean;
  password: string;
}

export interface Period {
  start: string;
  end: string;
}

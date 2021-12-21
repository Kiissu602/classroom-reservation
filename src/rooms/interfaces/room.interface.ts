import { Document } from "mongoose";
import { Reserve } from "src/reserve/interfaces/reserve.interface";
export interface Room extends Document {
  number: string;
  quantity: number;
  type: string;
  reserved: Reserve[];
}

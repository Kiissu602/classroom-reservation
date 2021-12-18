import { Document } from "mongoose";
import { Reserve } from "src/reserve/interfaces/reserve.interface";
import { roomType } from "../dto/room.dto";
export interface Room extends Document {
  number: string;
  quantity: number;
  type: string;
  reserved: Reserve[];
}

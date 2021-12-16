import { Document } from 'mongoose';

export interface Room extends Document {
  number: string;
  quantity: number;
  size: number;
}

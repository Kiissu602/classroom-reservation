import { Period } from "../interfaces/reserve.interface";

export class createReservesDto {
  roomId: string;
  by: string;
  date: Date;
  periods: reservePreriod[];
  description: string;
  password: string;
  phone: string;
  email: string;
}

export class reserveDto {
  roomId: string;
  by: string;
  date: Date;
  periods: reservePreriod[];
  description: string;
  password: string;
  phone: string;
  email: string;
}

export class editReserveDto {
  reserveId: string;
  start: Date;
  end: Date;
  description: string;
}

export class reserveData {
  roomId: string;
  date: Date;
  periods: reservePreriod[];
}

export class reservePreriod {
  start: string;
  end: string;
}

export class getFreeTimeDto {
  id: string;
  date: Date;
}

export class freeTimeDto {
  text: string;
  value: reservePreriod;
}

export class getReserveDto {
  _id: string;
  date: Date;
  name: string;
  roomNumber: string;
  periods: Period[];
  description: string;
  cancelled: boolean;
}

export class cancelReserveDto {
  password: string;
  _id: string;
}

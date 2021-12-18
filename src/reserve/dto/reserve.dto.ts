export class createReserveDto {
  roomId: string;
  roomNumber: string;
  reservedBy: string;
  start: Date;
  end: Date;
  description: string;
}

export class editReserveDto {
  reserveId: string;
  start: Date;
  end: Date;
  description: string;
}

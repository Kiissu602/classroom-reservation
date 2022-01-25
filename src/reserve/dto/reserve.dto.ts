export class createReserveDto {
  roomId: string;
  reservedBy: string;
  reservedDate: string;
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

export class reserveData {
  roomId: string;
  start: Date;
  end: Date;
}

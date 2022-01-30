export class createReservesDto {
  roomId: string;
  by: string;
  date: Date;
  time: [reservePreriod];
  description: string;
  password: string;
  phone: string;
  email: string;
}

export class reserveDto {
  roomId: string;
  by: string;
  date: Date;
  start: string;
  end: string;
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
  time: reservePreriod[];
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
  date: Date;
  name: string;
  roomNumber: string;
  times: string[];
  _ids: string[];
  cancelled: boolean;
}

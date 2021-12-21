export class CreateRoomDto {
  number: string;
  quantity: number;
  type: roomType;
}

export enum roomType {
  Lecture,
  Laboratory,
}

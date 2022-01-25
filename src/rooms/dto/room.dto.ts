export class CreateRoomDto {
  number: string;
  quantity: number;
  image: string;
  type: roomType;
}

export enum roomType {
  Lecture,
  Laboratory,
}

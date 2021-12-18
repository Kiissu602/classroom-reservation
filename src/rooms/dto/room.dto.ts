export class CreateRoomDto {
  number: string;
  quantity: number;
  type: number;
}

export enum roomType {
  Lecture = "Lecture",
  Laboratory = "Laboratory",
}

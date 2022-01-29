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

export class SearchRoomDto {
  number?: string;
  date?: Date;
  start?: string;
  end?: string;
  type?: roomType;
}


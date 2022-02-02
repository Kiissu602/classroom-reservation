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
  number?: string | null;
  date?: Date | null;
  start?: string | null;
  end?: string | null;
  type?: roomType | null;
}

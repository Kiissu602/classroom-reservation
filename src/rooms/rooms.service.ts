import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { Room } from "./interfaces/room.interface";
import * as r from "./dto/room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @Inject("ROOM_MODEL")
    private _roomModel: Model<Room>
  ) {}

  async createRoom(createRoomDto: r.CreateRoomDto): Promise<Room> {
    const room = {
      number: createRoomDto.number,
      quantity: createRoomDto.quantity,
      image: createRoomDto.image,
      type: r.roomType[createRoomDto.type].toString(),
    } as Room;

    const createRoom = new this._roomModel(room);
    return await createRoom.save();
  }

  async getRooms(): Promise<Room[]> {
    return (await this._roomModel.find().exec()).sort((a, b) =>
      a.number > b.number ? 1 : -1
    );
  }

  async searchRoom(data: r.SearchRoomDto): Promise<Room[]> {
    data.number = data.number?.toUpperCase();

    let rooms = await this._roomModel.find({
      number: data.number == null ? { $ne: null } : { $regex: data.number },
      type:
        data.type == null ? { $ne: null } : r.roomType[data.type].toString(),
    });

    for (let i = 0; i < rooms.length; i++) {
      let found = false;
      if (data.date != null && data.start != null) {
        rooms[i].reserved.forEach((r) => {
          if (
            r.date.getTime() == new Date(data.date).getTime() &&
            r.cancelled == false
          ) {
            return (found =
              r.periods.length == 6 ||
              r.periods.some((p) => p.start == data.start));
          }
        });
      } else if (data.date != null && data.start == null) {
        let count = 0;
        rooms[i].reserved.forEach((r) => {
          if (
            r.date.getTime() == new Date(data.date).getTime() &&
            r.cancelled == false
          ) {
            count += r.periods.length;
          }

          if (count == 6) {
            return (found = true);
          }
        });
      }

      if (found) rooms.splice(i, 1);
    }

    return rooms;
  }
}

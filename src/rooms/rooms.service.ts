import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { Room } from "./interfaces/room.interface";
import * as r from "./dto/room.dto";
import { Reserve } from "src/reserve/interfaces/reserve.interface";

@Injectable()
export class RoomsService {
  constructor(
    @Inject("ROOM_MODEL")
    private _roomModel: Model<Room>,
    @Inject("RESERVE_MODEL")
    private _reserveModel: Model<Reserve>
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
    return await (
      await this._roomModel.find().exec()
    ).sort((a, b) => (a.number > b.number ? 1 : -1));
  }

  async searchRoom(data: r.SearchRoomDto): Promise<Room[]> {
    let rooms = [];
    if (data.number == null && data.type == null) {
      rooms = await this._roomModel.find();
    } else if (data.number != null && data.type == null) {
      data.number = data.number.toUpperCase();
      rooms = await this._roomModel.find({
        number: { $regex: data.number },
      });
    } else if (data.number == null && data.type != null) {
      rooms = await this._roomModel.find({ type: r.roomType[data.type] });
    } else {
      rooms = await this._roomModel.find({
        number: { $regex: data.number },
        type: r.roomType[data.type],
      });
    }

    for (let i = 0; i < rooms.length; i++) {
      let found = false;
      if (data.date != null && data.start != null) {
        found = rooms[i].reserved.some(
          (el) =>
            el.date.getTime() === data.date.getTime() && el.start == data.start
        );
      } else if (data.date != null && data.start == null) {
        let count = 0;
        rooms[i].reserved.array.forEach((element) => {
          if (element.date.getTime() === data.date.getTime()) {
            count++;
          }
        });
        found = count == 6;
      }
      if (found) {
        rooms.slice(i, 1);
      }
    }

    return rooms;
  }
}

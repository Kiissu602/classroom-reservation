import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { Room } from "./interfaces/room.interface";
import * as r from "./dto/room.dto";
import { create } from "domain";

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
    return await (
      await this._roomModel.find().exec()
    ).sort((a, b) => (a.number > b.number ? 1 : -1));
  }

  // async getFreeRoom(searchRoomDto: r.SearchRoomDto):Promise<Room[]> {

  // }
}

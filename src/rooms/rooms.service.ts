import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { Room } from "./interfaces/room.interface";
import * as r from "./dto/room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @Inject("ROOM_MODEL")
    private roomModel: Model<Room>
  ) {}

  async createRoom(createRoomDto: r.CreateRoomDto): Promise<Room> {
    const room = {
      number: createRoomDto.number,
      quantity: createRoomDto.quantity,
      type:
        createRoomDto.type == 0 ? r.roomType.Lecture : r.roomType.Laboratory,
    } as Room;
    const createRoom = new this.roomModel(room);
    return await createRoom.save();
  }

  async getRoom(number: string): Promise<Room> {
    return await this.roomModel.findOne({ number: number }).exec();
  }

  async getRooms(): Promise<Room[]> {
    return await this.roomModel.find().exec();
  }
}

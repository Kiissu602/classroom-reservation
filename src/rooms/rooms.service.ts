import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { Room } from "./interfaces/room.interface";
import { CreateRoomDto } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @Inject("ROOM_MODEL")
    private roomModel: Model<Room>
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDto);
    return await createdRoom.save();
  }

  async getRoom(number: string): Promise<Room> {
    return await this.roomModel.findOne({ number: number }).exec();
  }
}

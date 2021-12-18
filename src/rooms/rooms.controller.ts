import { Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { CreateRoomDto } from "./dto/room.dto";
import { Room } from "./interfaces/room.interface";

import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private _roomsService: RoomsService) {}

  @Get("by_number")
  async getRoom(@Req() request: Request): Promise<Room> {
    return await this._roomsService.getRoom(request.body.number);
  }

  @Get("all_rooms")
  async getRooms(): Promise<Room[]> {
    return await this._roomsService.getRooms();
  }

  @Post()
  async createRoom(@Req() request: Request): Promise<Room> {
    const room = request.body as CreateRoomDto;
    return await this._roomsService.createRoom(room);
  }
}

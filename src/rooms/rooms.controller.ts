import { Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { CreateRoomDto } from "./dto/room.dto";
import { Room } from "./interfaces/room.interface";

import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  async getRoom(@Req() request: Request): Promise<Room> {
    const room = request.body.number;
    return await this.roomsService.getRoom(room);
  }

  @Post()
  async createRoom(@Req() request: Request): Promise<CreateRoomDto> {
    const room = request.body as CreateRoomDto;
    return await this.roomsService.createRoom(room);
  }
}

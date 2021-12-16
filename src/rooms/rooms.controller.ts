import { Controller, Post, Req } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';
import { Request } from 'express';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  async createRoom(@Req() request: Request): Promise<CreateRoomDto> {
    const room = request.body as CreateRoomDto;
    return await this.roomsService.createRoom(room);
  }
}

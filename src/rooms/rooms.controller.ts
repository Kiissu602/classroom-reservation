import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { diskStorage } from "multer";
import * as path from "path";

import { CreateRoomDto } from "./dto/room.dto";
import { Room } from "./interfaces/room.interface";

import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private _roomsService: RoomsService) {}

  @Get("all")
  async getRooms(@Res() response: Response) {
    const allRooms = await this._roomsService.getRooms();
    response.send(allRooms);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./src/assets/",
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, "") + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    })
  )
  async createRoom(
    @Req() request: Request,
    @UploadedFile() image
  ): Promise<Room> {
    let room = request.body as CreateRoomDto;
    room.image = image.path;
    return await this._roomsService.createRoom(room);
  }

  @Get("/number:number")
  async getRoom(@Param("number") number: string): Promise<Room> {
    return await this._roomsService.getRoom(number);
  }
}

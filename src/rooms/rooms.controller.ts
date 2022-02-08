import {
  Controller,
  Get,
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
import { join } from "path";
import { Observable, of } from "rxjs";

import { CreateRoomDto, SearchRoomDto } from "./dto/room.dto";
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

  @Get("search/:number/:date/:start/:end/:type")
  async searchRoom(
    @Param("number") number: string,
    @Param("date") date: Date,
    @Param("start") start: string,
    @Param("end") end: string,
    @Param("type") type: number,
    @Res() response: Response
  ) {
    console.log(type);

    const data: SearchRoomDto = {
      number: number == "null" || number == "" ? null : number,
      date: date.toString() == "null" || date.toString() == "" ? null : date,
      start: start == "null" || start == "" ? null : start,
      end: end == "null" || end == "" ? null : end,
      type:
        type.toString() == "null" || type.toString() == "" ? null : type - 1,
    };

    const rooms = await this._roomsService.searchRoom(data);
    response.send(rooms);
  }

  @Get("room-image/:image")
  findRoomImage(@Param("image") image, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), "src/images/" + image)));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./src/images/",
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
    room.image = image.filename;
    return await this._roomsService.createRoom(room);
  }
}

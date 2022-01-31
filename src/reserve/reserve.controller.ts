import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";

import * as rs from "./dto/reserve.dto";
import { Reserve } from "./interfaces/reserve.interface";
import { ReserveService } from "./reserve.service";

@Controller("reserve")
export class ReserveController {
  constructor(private _reserveService: ReserveService) {}

  @Get("all")
  async getAllReserve(@Res() response: Response) {
    const allReserve = await this._reserveService.getAllReserve();
    response.send(allReserve);
  }

  @Get("freeTime")
  async getFreeTime(@Req() request: Request, @Res() response: Response) {
    const req = request.body as rs.getFreeTimeDto;
    const freetime = await this._reserveService.getFreeTime(req);
    response.send(freetime);
  }

  @Post()
  async createReserve(@Req() request: Request, @Res() response: Response) {
    const createReserve = request.body as rs.createReservesDto;
    const res = await this._reserveService.createReservation(createReserve);
    response.status(HttpStatus.OK).send(res);
  }

  @Put("Cancel")
  async cancelReserve(@Req() request: Request, @Res() response: Response) {
    const cancelId = request.body as string[];
    const res = await this._reserveService.cancelReserve(cancelId);
    response.send(res);
  }
}

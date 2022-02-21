import {
  Controller,
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

import { ReserveService } from "./reserve.service";

@Controller("reserve")
export class ReserveController {
  constructor(private _reserveService: ReserveService) {}

  @Get("all")
  async getAllReserve(@Res() response: Response) {
    const allReserve = await this._reserveService.getAllReserve();
    response.send(allReserve);
  }

  @Get("search/:name/:number/:date/:start/:end")
  async searchReserve(
    @Param("name") name: string,
    @Param("number") number: string,
    @Param("date") date: Date,
    @Param("start") start: string,
    @Param("end") end: string,
    @Res() response: Response
  ) {
    const searchData: rs.searchReserveDto = {
      name: name == "null" || name == "" ? null : name,
      number: number == "null" || number == "" ? null : number,
      date: date.toString() == "null" || date.toString() == "" ? null : date,
      start: start == "null" || start == "" ? null : start,
      end: end == "null" || end == "" ? null : end,
    };

    const reserved = await this._reserveService.searchReserve(searchData);

    response.send(reserved);
  }

  @Get("freeTime/:id/:date")
  async getFreeTime(
    @Param("id") id: string,
    @Param("date") date: Date,
    @Res() response: Response
  ) {
    const req: rs.getFreeTimeDto = { id: id, date: date };
    const freetime = await this._reserveService.getFreeTime(req);
    response.send(freetime);
  }

  @Post()
  async createReserve(@Req() request: Request, @Res() response: Response) {
    const createReserve = request.body as rs.createReservesDto;
    const res = await this._reserveService.createReservation(createReserve);
    response.status(HttpStatus.OK).send(res);
  }

  @Put("cancel")
  async cancelReserve(@Req() request: Request, @Res() response: Response) {
    const cancelId = request.body as rs.cancelReserveDto;
    const res = await this._reserveService.cancelReserve(cancelId);
    response.send(res);
  }
}

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
  @Get(":id")
  async getReserve(@Param("id") id: string, @Res() response: Response) {
    const reserved = await this._reserveService.getReserveById(id);
    response.send(reserved);
  }

  @Get("all-reserve")
  async getAllReserve(@Res() response: Response) {
    const allReserve = await this._reserveService.getAllReserve();
    response.send(allReserve);
  }

  @Get("bynumber:number")
  async getReserveByNumber(
    @Param("number") number: string,
    @Res() response: Response
  ) {
    const reserved = await this._reserveService.getReserveByRoomNumber(number);
    response.send(reserved);
  }

  @Post()
  async createReserve(@Req() request: Request, @Res() response: Response) {
    const createReserve = request.body as rs.createReserveDto;
    const res = await this._reserveService.createReserve(createReserve);
    response.status(HttpStatus.OK).send(res);
  }

  @Put()
  async editReserve(@Req() request: Request, @Res() response: Response) {
    const editReserve = request.body as rs.editReserveDto;

    const edited = await this._reserveService.editReserve(editReserve);
    response.send(edited);
  }

  @Delete(":id")
  async cancelReserve(@Param("id") id: string): Promise<Reserve> {
    return await this._reserveService.cancelReserve(id);
  }
}

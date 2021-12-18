import { Controller, Delete, Param, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";

import * as rs from "./dto/reserve.dto";
import { Reserve } from "./interfaces/reserve.interface";
import { ReserveService } from "./reserve.service";

@Controller("reserve")
export class ReserveController {
  constructor(private _reserveService: ReserveService) {}

  @Post()
  async createReserve(@Req() request: Request): Promise<Reserve> {
    const createReserve = request.body as rs.createReserveDto;
    return await this._reserveService.createReserve(createReserve);
  }

  @Put()
  async editReserve(@Req() request: Request): Promise<Reserve> {
    const editReserve = request.body as rs.editReserveDto;
    return await this._reserveService.editReserve(editReserve);
  }

  @Delete(":id")
  async cancelReserve(@Param("id") id: string): Promise<Reserve> {
    return await this._reserveService.cancelReserve(id);
  }
}

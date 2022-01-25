import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import * as lt from "./dto/long-term-reserved.dto";
import { LongTermReservedService } from "./long-term-reserved.service";

@Controller("long-term-reserved")
export class LongTermReservedController {
  constructor(private _longTermService: LongTermReservedService) {}

  @Post()
  async createLongTerm(@Req() request: Request, @Res() response: Response) {
    const longTermReserve = request.body as lt.CreateLongTermDto;
    const lt = await this._longTermService.createLongTerm(longTermReserve);
    response.status(HttpStatus.OK).send(lt);
  }
}

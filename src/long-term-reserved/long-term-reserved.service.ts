import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { LongTermReserved } from "./interfaces/long-term-reserved.interface";
import * as lt from "./dto/long-term-reserved.dto";
import { create } from "domain";

@Injectable()
export class LongTermReservedService {
  constructor(
    @Inject("LONGTERMRESERVED_MODEL")
    private _longTermModel: Model<LongTermReserved>
  ) {}

  async createLongTerm(longTerm: lt.CreateLongTermDto): Promise<string> {
    const createLt = new this._longTermModel(longTerm);
    await createLt.save();

    return "Success";
  }
}

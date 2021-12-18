import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Reserve } from "./interfaces/reserve.interface";
import * as rs from "./dto/reserve.dto";

@Injectable()
export class ReserveService {
  constructor(
    @Inject("RESERVE_MODEL")
    private reserveModel: Model<Reserve>
  ) {}

  async createReserve(createReserveDto: rs.createReserveDto): Promise<Reserve> {
    const reserve = new this.reserveModel(createReserveDto);
    return await reserve.save();
  }

  async editReserve(editReserveDto: rs.editReserveDto): Promise<Reserve> {
    const reserve = await this.reserveModel
      .findById(editReserveDto.reserveId)
      .exec();

    reserve.start = editReserveDto.start;
    reserve.end = editReserveDto.end;
    reserve.description = editReserveDto.description;

    return await reserve.save();
  }

  async cancelReserve(id: string): Promise<Reserve> {
    const reserve = await this.reserveModel.findById(id).exec();

    reserve.cancelled = true;

    return await reserve.save();
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Reserve } from "./interfaces/reserve.interface";
import * as rs from "./dto/reserve.dto";

@Injectable()
export class ReserveService {
  constructor(
    @Inject("RESERVE_MODEL")
    private _reserveModel: Model<Reserve>
  ) {}

  async createReserve(createReserveDto: rs.createReserveDto): Promise<string> {
    const reservedata: rs.reserveData = {
      roomNumber: createReserveDto.roomNumber,
      start: createReserveDto.start,
      end: createReserveDto.end,
    };

    if (await this._alreadyReserved(reservedata)) {
      return "Already reserved";
    }

    const reserve = new this._reserveModel(createReserveDto);
    let error = reserve.validateSync();
    if (error) {
      return error.message;
    }

    await reserve.save();
    return "Success";
  }

  async editReserve(editReserveDto: rs.editReserveDto): Promise<string> {
    const roomNumber = (
      await this._reserveModel.findById(editReserveDto.reserveId)
    ).roomNumber;

    const reserveData: rs.reserveData = {
      roomNumber: roomNumber,
      start: editReserveDto.start,
      end: editReserveDto.end,
    };

    if (await this._alreadyReserved(reserveData)) {
      return "Already reserved";
    }

    await this._reserveModel.updateOne(
      { _id: editReserveDto.reserveId },
      {
        start: editReserveDto.start,
        end: editReserveDto.end,
        description: editReserveDto.description,
      }
    );

    return "Success";
  }

  async cancelReserve(id: string): Promise<Reserve> {
    const reserve = await this._reserveModel.findById(id).exec();

    reserve.cancelled = true;

    return await reserve.save();
  }

  async getAllReserve(): Promise<Reserve[]> {
    const allReserve = await this._reserveModel.find().exec();
    return allReserve;
  }

  async getReserveById(id: string): Promise<Reserve> {
    const reserved = await this._reserveModel.findById(id).exec();
    return reserved;
  }

  async getReserveByRoomNumber(roomNumber: string): Promise<Reserve[]> {
    const reserved = await this._reserveModel
      .find({ roomNumber: roomNumber })
      .exec();
    return reserved;
  }

  private async _alreadyReserved(
    reserveDate: rs.reserveData
  ): Promise<boolean> {
    const reserve = await this._reserveModel.exists({
      roomNumber: reserveDate.roomNumber,
      start: reserveDate.start,
      end: reserveDate.end,
    });

    return reserve;
  }
}

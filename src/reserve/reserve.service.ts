import { Get, Inject, Injectable } from "@nestjs/common";
import { Model, Promise } from "mongoose";
import { Reserve } from "./interfaces/reserve.interface";
import * as rs from "./dto/reserve.dto";
import { Room } from "src/rooms/interfaces/room.interface";

@Injectable()
export class ReserveService {
  constructor(
    @Inject("RESERVE_MODEL")
    private _reserveModel: Model<Reserve>,
    @Inject("ROOM_MODEL")
    private _roomModel: Model<Room>
  ) {}

  async createReservation(
    createReserveDto: rs.createReservesDto
  ): Promise<string> {
    const reservedata: rs.reserveData = {
      roomId: createReserveDto.roomId,
      date: createReserveDto.date,
      time: createReserveDto.time,
    };

    const alreadyReserve = await this._alreadyReserved(reservedata);
    if (alreadyReserve.length > 0) {
      let failMessage = "Fail";
      for (let i = 0; i < alreadyReserve.length; i++) {
        failMessage += `${alreadyReserve[i]}`;
      }
      return `${failMessage} is already reserved`;
    }

    const reserved = await this._createReserve(createReserveDto);

    return "Success";
  }

  async cancelReserve(cancelData: rs.cancelReserveDto): Promise<string> {
    if (
      (await this._reserveModel.findById(cancelData._ids[0])).password !=
      cancelData.password
    ) {
      return "Fail wrong password";
    }
    for (let i = 0; i < cancelData._ids.length; i++) {
      const cancelled = await this._reserveModel.findOneAndUpdate(
        { _id: cancelData._ids[i] },
        { cancelled: true }
      );
      await cancelled.save();
      const room = await this._roomModel.findById(cancelled.roomId);

      const idx = room.reserved.findIndex(
        (r) => r._id.toString() == cancelled.id.toString()
      );
      room.reserved[idx].cancelled = true;
      const updatedRoom = await this._roomModel.findOneAndUpdate(
        { _id: cancelled.roomId },
        { reserved:  room.reserved }
      );
      await updatedRoom.save();
    }

    return "Success";
  }

  async getAllReserve(): Promise<rs.getReserveDto[]> {
    const allReserve = await this._reserveModel
      .find()
      .sort({ $natural: -1 })
      .limit(100);
    let reserved = [];

    for (const element of allReserve) {
      const found = reserved.some(
        (el) => el.date.getTime() === element.date.getTime()
      );

      if (found) {
        const idx = reserved.findIndex(
          (el) => el.date.getTime() === element.date.getTime()
        );

        reserved[idx].times.push(`${element.start} - ${element.end}`);
        reserved[idx]._ids.push(element._id);
      } else {
        const room = await this._roomModel.findById(element.roomId);
        const reserve: rs.getReserveDto = {
          date: element.date,
          name: element.by,
          roomNumber: room.number,
          times: [`${element.start} - ${element.end}`],
          _ids: [element._id],
          description: element.description,
          cancelled: element.cancelled,
        };
        reserved.push(reserve);
      }
    }

    return reserved;
  }

  async getFreeTime(requireTime: rs.getFreeTimeDto): Promise<rs.freeTimeDto[]> {
    let alllFreeTime = [
      { start: "8.00", end: "9.30" },
      { start: "9.30", end: "11.00" },
      { start: "11.00", end: "12.30" },
      { start: "12.30", end: "14.00" },
      { start: "14.00", end: "15.30" },
      { start: "15.30", end: "17.00" },
    ];

    let freeTime = [];

    const reserved = await this._reserveModel.find({
      roomId: requireTime.id,
      date: requireTime.date,
      cancelled: false,
    });

    for (let i = 0; i < reserved.length; i++) {
      alllFreeTime.forEach((element, index) => {
        if (element.start == reserved[i].start) alllFreeTime.splice(index, 1);
      });
    }

    for (let j = 0; j < alllFreeTime.length; j++) {
      const time: rs.freeTimeDto = {
        text: `${alllFreeTime[j].start} - ${alllFreeTime[j].end}`,
        value: { start: alllFreeTime[j].start, end: alllFreeTime[j].end },
      };
      freeTime.push(time);
    }

    return freeTime;
  }

  private async _alreadyReserved(data: rs.reserveData): Promise<string[]> {
    let message = [];
    for (let i = 0; i < data.time.length; i++) {
      const reserved = await this._reserveModel.exists({
        roomId: data.roomId,
        date: data.date,
        start: data.time[i].start,
        end: data.time[i].end,
        cancelled: false,
      });

      if (reserved) {
        message.push(`'${data.time[i].start}' - '${data.time[i].end}'`);
      }
    }

    return message;
  }

  private async _createReserve(createReserveDto: rs.createReservesDto) {
    const room = await this._roomModel.findById(createReserveDto.roomId);
    let message = [];

    for (let i = 0; i < createReserveDto.time.length; i++) {
      const res: rs.reserveDto = {
        roomId: createReserveDto.roomId,
        by: createReserveDto.by,
        date: new Date(createReserveDto.date),
        start: createReserveDto.time[i].start,
        end: createReserveDto.time[i].end,
        description: createReserveDto.description,
        password: createReserveDto.password,
        phone: createReserveDto.phone,
        email: createReserveDto.email,
      };

      const reserve = new this._reserveModel(res);
      let error = reserve.validateSync();
      if (error) {
        message.push(
          `"${createReserveDto.time[i].start}" - "${createReserveDto.time[i].end}"
            \n 
            ${error.message}`
        );
      }
      room.reserved.push(reserve);
      await reserve.save();
    }
    await room.save();
    if (message.length > 0) {
      return message;
    }
    return ["Success"];
  }
}

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
      periods: createReserveDto.periods,
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
    const reserve = await this._reserveModel.findById(cancelData._id);

    if (reserve.password != cancelData.password) {
      return "Fail wrong password";
    }
    const cancelled = await this._reserveModel.findOneAndUpdate(
      { _id: cancelData._id },
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
      { reserved: room.reserved }
    );
    await updatedRoom.save();

    return "Success";
  }

  async getAllReserve(): Promise<rs.getReserveDto[]> {
    const allReserve = await this._reserveModel
      .find()
      .sort({ $natural: -1 })
      .limit(50);

    let result = [];

    for (let element of allReserve) {
      const room = await this._roomModel.findById(element.roomId);

      const reserved: rs.getReserveDto = {
        _id: element._id,
        name: element.by,
        date: element.date,
        roomNumber: room.number,
        description: element.description,
        cancelled: element.cancelled,
        periods: element.periods,
      };
      result.push(reserved);
    }
    return result;
  }

  async searchReserve(data: rs.searchReserveDto): Promise<rs.getReserveDto[]> {
    let reserved = [];
    console.log(data);

    if (data.number != null) {
      reserved = await this._searchByNumber(data);
    } else if (data.name != null && data.date != null && data.start != null) {
      const res = await this._reserveModel
        .find({
          by: { $regex: data.name },
          date: new Date(data.date),
        })
        .sort({ $natural: -1 })
        .limit(50);
      for (let r of res) {
        const found = r.periods.some((p) => p.start == data.start);
        if (found) {
          const reserve: rs.getReserveDto = {
            _id: r._id,
            date: r.date,
            name: r.by,
            roomNumber: (await this._roomModel.findById(r.roomId)).number,
            periods: r.periods,
            description: r.description,
            cancelled: r.cancelled,
          };
          reserved.push(reserve);
        }
      }
    } else if (data.name != null && data.date != null) {
      const res = await this._reserveModel
        .find({
          by: { $regex: data.name },
          date: new Date(data.date),
        })
        .sort({ $natural: -1 })
        .limit(50);
      for (let r of res) {
        const reserve: rs.getReserveDto = {
          _id: r._id,
          date: r.date,
          name: r.by,
          roomNumber: (await this._roomModel.findById(r.roomId)).number,
          periods: r.periods,
          description: r.description,
          cancelled: r.cancelled,
        };
        reserved.push(reserve);
      }
    } else if (data.name != null) {
      const res = await this._reserveModel
        .find({
          by: { $regex: data.name },
        })
        .sort({ $natural: -1 })
        .limit(50);

      for (let r of res) {
        const reserve: rs.getReserveDto = {
          _id: r._id,
          date: r.date,
          name: r.by,
          roomNumber: (await this._roomModel.findById(r.roomId)).number,
          periods: r.periods,
          description: r.description,
          cancelled: r.cancelled,
        };
        reserved.push(reserve);
      }
    } else {
      return await this.getAllReserve();
    }
    return reserved;
  }

  private async _searchByNumber(
    data: rs.searchReserveDto
  ): Promise<rs.getReserveDto[]> {
    let reserved = [];
    data.number = data.number.toUpperCase();
    let rooms = await this._roomModel.find({
      number: { $regex: data.number },
    });
    for (let room of rooms) {
      if (data.name != null && data.date != null && data.start != null) {
        room.reserved.forEach((r) => {
          const haveStart = r.periods.some((p) => p.start == data.start);
          if (
            r.by == data.name &&
            r.date.getTime() == new Date(data.date).getTime() &&
            haveStart
          ) {
            const reserve: rs.getReserveDto = {
              _id: r._id,
              date: r.date,
              name: r.by,
              roomNumber: room.number,
              periods: r.periods,
              description: r.description,
              cancelled: r.cancelled,
            };
            reserved.push(reserve);
          }
        });
      } else if (data.name != null && data.date != null && data.start == null) {
        room.reserved.forEach((r) => {
          if (
            r.by == data.name &&
            r.date.getTime() == new Date(data.date).getTime()
          ) {
            const reserve: rs.getReserveDto = {
              _id: r._id,
              date: r.date,
              name: r.by,
              roomNumber: room.number,
              periods: r.periods,
              description: r.description,
              cancelled: r.cancelled,
            };
            reserved.push(reserve);
          }
        });
      } else if (data.name != null && data.date == null && data.start == null) {
        room.reserved.forEach((r) => {
          if (r.by == data.name) {
            reserved.push(r);
          }
        });
      } else {
        room.reserved.forEach((r) => {
          const reserve: rs.getReserveDto = {
            _id: r._id,
            date: r.date,
            name: r.by,
            roomNumber: room.number,
            periods: r.periods,
            description: r.description,
            cancelled: r.cancelled,
          };
          reserved.push(reserve);
        });
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
      alllFreeTime.forEach((t, index) => {
        if (reserved[i].periods.some((p) => p.start == t.start))
          alllFreeTime.splice(index, 1);
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
    const reserved = await this._reserveModel.find({
      roomId: data.roomId,
      date: data.date,
      cancelled: false,
    });

    for (let res of reserved) {
      data.periods.forEach((p) => {
        const found = res.periods.some((r) => r.start == p.start);
        if (found) {
          message.push(`'${p.start}' - '${p.end}'`);
        }
      });
    }

    return message;
  }

  private async _createReserve(
    createReserveDto: rs.createReservesDto
  ): Promise<String> {
    const room = await this._roomModel.findById(createReserveDto.roomId);
    const reserve: rs.reserveDto = {
      roomId: createReserveDto.roomId,
      by: createReserveDto.by,
      date: new Date(createReserveDto.date),
      periods: createReserveDto.periods,
      description: createReserveDto.description,
      password: createReserveDto.password,
      phone: createReserveDto.phone,
      email: createReserveDto.email,
    };

    const reserving = new this._reserveModel(reserve);
    let error = reserving.validateSync();
    if (error) {
      return error.message;
    }
    await reserving.save();

    room.reserved.push(reserving);

    const updateRoom = await this._roomModel.findOneAndUpdate(
      { _id: createReserveDto.roomId },
      { reserved: room.reserved }
    );
    await updateRoom.save();
    return "Success";
  }
}

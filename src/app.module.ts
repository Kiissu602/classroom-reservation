import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RoomsController } from "./rooms/rooms.controller";
import { RoomsService } from "./rooms/rooms.service";
import { roomsProviders } from "./rooms/room.providers";
import { DatabaseModule } from "./database/database.module";
import { ReserveController } from "./reserve/reserve.controller";
import { ReserveService } from "./reserve/reserve.service";
import { reserveProviders } from "./reserve/reserve.providers";
import { LongTermReservedController } from "./long-term-reserved/long-term-reserved.controller";
import { LongTermReservedService } from "./long-term-reserved/long-term-reserved.service";
import { longTermReservedProviders } from "./long-term-reserved/long-term-reserved.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    RoomsController,
    ReserveController,
    LongTermReservedController,
  ],
  providers: [
    AppService,
    RoomsService,
    ReserveService,
    LongTermReservedService,
    ...roomsProviders,
    ...reserveProviders,
    ...longTermReservedProviders,
  ],
})
export class AppModule {}

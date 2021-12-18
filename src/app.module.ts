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

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, RoomsController, ReserveController],
  providers: [
    AppService,
    RoomsService,
    ReserveService,
    ...roomsProviders,
    ...reserveProviders,
  ],
})
export class AppModule {}

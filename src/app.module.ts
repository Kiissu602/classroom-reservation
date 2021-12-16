import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { roomsProviders } from './rooms/room.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, RoomsController],
  providers: [AppService, RoomsService, RoomsService, ...roomsProviders],
})
export class AppModule {}

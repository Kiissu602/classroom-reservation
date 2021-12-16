import { Connection } from 'mongoose';
import { RoomSchema } from './schemas/room.schema';

export const roomsProviders = [
  {
    provide: 'ROOM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('ROOM', RoomSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

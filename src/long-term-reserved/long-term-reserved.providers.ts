import { Connection } from "mongoose";
import { LongTermReservedSchema } from "./schemas/long-term-reserved.schemas";

export const longTermReservedProviders = [
  {
    provide: "LONGTERMRESERVED_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("LONGTERMRESERVED", LongTermReservedSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];

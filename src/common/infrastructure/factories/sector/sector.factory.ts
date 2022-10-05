import { EntityFactory } from "@/common/infrastructure/factories";
import { Sector } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class SectorFactory implements EntityFactory<Sector> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Sector> {
    const sector = new Sector({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    return sector;
  }
}

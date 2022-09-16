import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { VehicleTypeEntityRepository } from "../persistence/repositories/vehicle-types";

@Injectable()
export class VehicleTypeFactory implements EntityFactory<VehicleType> {
  constructor(
    private readonly _vehicleTypeRepository: VehicleTypeEntityRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any): Promise<VehicleType> {
    const vehicleType = new VehicleType({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._vehicleTypeRepository.create(vehicleType);

    return vehicleType;
  }
}

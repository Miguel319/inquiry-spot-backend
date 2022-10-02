import { EntityFactory } from "@/common/infrastructure/factories";
import { VehicleTypeCreatedEvent } from "@/vehicle/application/events";
import { VehicleType } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { VehicleTypeSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleTypeFactory implements EntityFactory<VehicleType> {
  constructor(
    @InjectModel(VehicleTypeSchema.name)
    private readonly _vehicleTypes: Model<VehicleTypeSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any): Promise<VehicleType> {
    const vehicleType = new VehicleType({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._vehicleTypes.create(args[0]);

    vehicleType.apply(
      new VehicleTypeCreatedEvent(vehicleType.getId(), vehicleType.getName()),
    );

    return vehicleType;
  }
}

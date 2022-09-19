import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { VehicleMakeCreatedEvent } from "@/vehicle/application/events";
import { VehicleMake } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { VehicleMakeSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleMakeFactory implements EntityFactory<VehicleMake> {
  constructor(
    @InjectModel(VehicleMakeSchema.name)
    private readonly _vehicleMakeModel: Model<VehicleMakeSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<VehicleMake> {
    const vehicleMake = new VehicleMake({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._vehicleMakeModel.create(args[0]);

    vehicleMake.apply(new VehicleMakeCreatedEvent(vehicleMake.getId()));

    return vehicleMake;
  }
}

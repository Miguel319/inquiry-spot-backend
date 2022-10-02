import { EntityFactory } from "@/common/infrastructure/factories";
import { VehicleStatusCreatedEvent } from "@/vehicle/application/events";
import { VehicleStatus } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { VehicleStatusSchema } from "../../persistence/schemas";

@Injectable()
export class VehicleStatusFactory implements EntityFactory<VehicleStatus> {
  constructor(
    @InjectModel(VehicleStatusSchema.name)
    private readonly _vehicleStatuss: Model<VehicleStatusSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any): Promise<VehicleStatus> {
    const vehicleStatus = new VehicleStatus({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._vehicleStatuss.create(args[0]);

    vehicleStatus.apply(
      new VehicleStatusCreatedEvent(
        vehicleStatus.getId(),
        vehicleStatus.getName(),
      ),
    );

    return vehicleStatus;
  }
}

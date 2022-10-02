import { EntityFactory } from "@/common/infrastructure/factories";
import { FuelCreatedEvent } from "@/vehicle/application/events";
import { Fuel } from "@/vehicle/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FuelSchema } from "../../persistence/schemas";

@Injectable()
export class FuelFactory implements EntityFactory<Fuel> {
  constructor(
    @InjectModel(FuelSchema.name)
    private readonly _fuelModel: Model<FuelSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Fuel> {
    const fuel = new Fuel({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._fuelModel.create(args[0]);

    fuel.apply(new FuelCreatedEvent(fuel.getId(), fuel.getName()));

    return fuel;
  }
}

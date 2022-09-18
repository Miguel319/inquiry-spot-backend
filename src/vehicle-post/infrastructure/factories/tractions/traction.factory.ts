import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { TractionCreatedEvent } from "@/vehicle-post/application/events";
import { Traction } from "@/vehicle-post/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { TractionSchema } from "../../persistence/schemas";

@Injectable()
export class TractionFactory implements EntityFactory<Traction> {
  constructor(
    @InjectModel(TractionSchema.name)
    private readonly _tractionModel: Model<TractionSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Traction> {
    const traction = new Traction({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._tractionModel.create(args[0]);

    traction.apply(
      new TractionCreatedEvent(traction.getId(), traction.getName()),
    );

    return traction;
  }
}

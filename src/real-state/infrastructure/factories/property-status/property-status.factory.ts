import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { PropertyStatusCreatedEvent } from "@/real-state/application/events";
import { PropertyStatus } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PropertyStatusSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyStatusFactory implements EntityFactory<PropertyStatus> {
  constructor(
    @InjectModel(PropertyStatusSchema.name)
    private readonly _propertyStatusModel: Model<PropertyStatusSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<PropertyStatus> {
    const propertyStatus = new PropertyStatus({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._propertyStatusModel.create(args[0]);

    propertyStatus.apply(
      new PropertyStatusCreatedEvent(
        propertyStatus.getId(),
        propertyStatus.getName(),
      ),
    );

    return propertyStatus;
  }
}

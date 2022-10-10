import { EntityFactory } from "@/common/infrastructure/factories";
import { PropertyPostCreatedEvent } from "@/real-state/application/events";
import { PropertyPost } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PropertyPostSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyPostFactory implements EntityFactory<PropertyPost> {
  constructor(
    @InjectModel(PropertyPostSchema.name)
    private readonly _propertyStatusModel: Model<PropertyPostSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<PropertyPost> {
    const propertyStatus = new PropertyPost({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._propertyStatusModel.create(args[0]);

    propertyStatus.apply(new PropertyPostCreatedEvent(propertyStatus.getId()));

    return propertyStatus;
  }
}

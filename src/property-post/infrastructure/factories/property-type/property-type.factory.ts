import { EntityFactory } from "@/common/infrastructure/persistence/factories";
import { PropertyTypeCreatedEvent } from "@/property-post/application/events";
import { PropertyType } from "@/property-post/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PropertyTypeSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyTypeFactory implements EntityFactory<PropertyType> {
  constructor(
    @InjectModel(PropertyTypeSchema.name)
    private readonly _propertyTypeModel: Model<PropertyTypeSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<PropertyType> {
    const propertyType = new PropertyType({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._propertyTypeModel.create(args[0]);

    propertyType.apply(
      new PropertyTypeCreatedEvent(
        propertyType.getId(),
        propertyType.getName(),
      ),
    );

    return propertyType;
  }
}

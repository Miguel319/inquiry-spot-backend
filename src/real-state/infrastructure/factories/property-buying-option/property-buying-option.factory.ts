import { EntityFactory } from "@/common/infrastructure/factories";
import { PropertyBuyingOptionCreatedEvent } from "@/real-state/application/events";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PropertyBuyingOptionSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyBuyingOptionFactory
  implements EntityFactory<PropertyBuyingOption>
{
  constructor(
    @InjectModel(PropertyBuyingOptionSchema.name)
    private readonly _propertyBuyingOptionModel: Model<PropertyBuyingOptionSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<PropertyBuyingOption> {
    const propertyBuyingOption = new PropertyBuyingOption({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._propertyBuyingOptionModel.create(args[0]);

    propertyBuyingOption.apply(
      new PropertyBuyingOptionCreatedEvent(
        propertyBuyingOption.getId(),
        propertyBuyingOption.getName(),
      ),
    );

    return propertyBuyingOption;
  }
}

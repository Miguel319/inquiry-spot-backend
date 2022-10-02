import { EntityFactory } from "@/common/infrastructure/factories";
import { ColorCreatedEvent } from "@/common/application/events";
import { Color } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ColorSchema } from "../../persistence/schemas";

@Injectable()
export class ColorFactory implements EntityFactory<Color> {
  constructor(
    @InjectModel(ColorSchema.name)
    private readonly _colorModel: Model<ColorSchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Color> {
    const color = new Color({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._colorModel.create(args[0]);

    color.apply(new ColorCreatedEvent(color.getId(), color.getName()));

    return color;
  }
}

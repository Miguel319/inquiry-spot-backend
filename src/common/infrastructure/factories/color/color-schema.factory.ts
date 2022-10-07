import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { Color } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ColorSchema } from "../../persistence/schemas";

@Injectable()
export class ColorSchemaFactory
  implements EntitySchemaFactory<ColorSchema, Color>
{
  public create(color: Color): ColorSchema {
    return {
      _id: new Types.ObjectId(color.getId()),
      name: color.getName(),
      hexValue: color.getHexValue(),
      createdAt: color.getCreatedAt(),
      updatedAt: color.getUpdatedAt(),
    };
  }

  public createFromSchema(entitySchema: ColorSchema | null): Color | null {
    if (!entitySchema) return null;

    return new Color({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}

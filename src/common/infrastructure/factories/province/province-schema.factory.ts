import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { Province } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ProvinceSchema } from "../../persistence/schemas";

@Injectable()
export class ProvinceSchemaFactory
  implements EntitySchemaFactory<ProvinceSchema, Province>
{
  public create(province: Province): ProvinceSchema {
    return {
      _id: new Types.ObjectId(province.getId()),
      name: province.getName(),
      createdAt: province.getCreatedAt(),
      updatedAt: province.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: ProvinceSchema | null,
  ): Province | null {
    if (!entitySchema) return null;

    return new Province({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}

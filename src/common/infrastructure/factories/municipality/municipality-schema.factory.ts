import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { Municipality } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { MunicipalitySchema } from "../../persistence/schemas";

@Injectable()
export class MunicipalitySchemaFactory
  implements EntitySchemaFactory<MunicipalitySchema, Municipality>
{
  public create(municipality: Municipality): MunicipalitySchema {
    return {
      _id: new Types.ObjectId(municipality.getId()),
      name: municipality.getName(),
      province: municipality.getProvince(),
      sectors: municipality.getSectors(),
      createdAt: municipality.getCreatedAt(),
      updatedAt: municipality.getUpdatedAt(),
    };
  }

  public createFromSchema(
    entitySchema: MunicipalitySchema | null,
  ): Municipality | null {
    if (!entitySchema) return null;

    return new Municipality({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}

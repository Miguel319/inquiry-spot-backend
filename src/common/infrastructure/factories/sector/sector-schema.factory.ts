import { EntitySchemaFactory } from "@/common/infrastructure/factories";
import { Sector } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { SectorSchema } from "../../persistence/schemas";

@Injectable()
export class SectorSchemaFactory
  implements EntitySchemaFactory<SectorSchema, Sector>
{
  public create(sector: Sector): SectorSchema {
    return {
      _id: new Types.ObjectId(sector.getId()),
      name: sector.getName(),
      municipality: sector.getMunicipality(),
      createdAt: sector.getCreatedAt(),
      updatedAt: sector.getUpdatedAt(),
    };
  }

  public createFromSchema(entitySchema: SectorSchema | null): Sector | null {
    if (!entitySchema) return null;

    return new Sector({
      ...entitySchema,
      _id: entitySchema._id.toHexString(),
    });
  }
}

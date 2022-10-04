import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Sector } from "@/common/domain/entities";
import { SectorSchemaFactory } from "@/common/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SectorSchema } from "../../schemas";

@Injectable()
export class SectorEntityRepository extends BaseEntityRepository<
  SectorSchema,
  Sector
> {
  constructor(
    @InjectModel(SectorSchema.name)
    sector: Model<SectorSchema>,
    sectorSchemaFactory: SectorSchemaFactory,
  ) {
    super(sector, sectorSchemaFactory);
  }
}

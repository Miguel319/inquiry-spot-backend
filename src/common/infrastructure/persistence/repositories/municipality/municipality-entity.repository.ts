import { BaseEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { Municipality } from "@/common/domain/entities";
import { MunicipalitySchemaFactory } from "@/common/infrastructure/factories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MunicipalitySchema } from "../../schemas";

@Injectable()
export class MunicipalityEntityRepository extends BaseEntityRepository<
  MunicipalitySchema,
  Municipality
> {
  constructor(
    @InjectModel(MunicipalitySchema.name)
    municipality: Model<MunicipalitySchema>,
    municipalitySchemaFactory: MunicipalitySchemaFactory,
  ) {
    super(municipality, municipalitySchemaFactory);
  }
}

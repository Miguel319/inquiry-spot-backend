import { EntityFactory } from "@/common/infrastructure/factories";
import { MunicipalityCreatedEvent } from "@/common/application/events";
import { Municipality } from "@/common/domain/entities";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MunicipalitySchema } from "../../persistence/schemas";

@Injectable()
export class MunicipalityFactory implements EntityFactory<Municipality> {
  constructor(
    @InjectModel(MunicipalitySchema.name)
    private readonly _municipalityModel: Model<MunicipalitySchema>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<Municipality> {
    const municipality = new Municipality({
      ...args[0],
      _id: new Types.ObjectId().toHexString(),
    });

    await this._municipalityModel.create(args[0]);

    municipality.apply(
      new MunicipalityCreatedEvent(
        municipality.getId(),
        municipality.getName(),
      ),
    );

    return municipality;
  }
}

import {
  Formatter,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Municipality } from "@/common/domain/entities";
import { MunicipalityDto } from "@/common/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { MunicipalityDocument, MunicipalitySchema } from "../../schemas";

@Injectable()
export class MunicipalityDtoRepository {
  constructor(
    @InjectModel(MunicipalitySchema.name)
    private readonly municipality: Model<MunicipalitySchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<MunicipalitySchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<MunicipalityDto>> {
    const query = Formatter.formatQuery(entityFilterQuery);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.municipality as any).paginate({ ...query }, { ...options });
  }

  private createMunicipalityDto(
    municipality: MunicipalityDocument,
  ): MunicipalityDto {
    return MunicipalityDto.create(municipality as unknown as Municipality);
  }

  async getById(_id: string): Promise<MunicipalityDto | null> {
    const municipality = await this.municipality.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!municipality) return null;

    return this.createMunicipalityDto(municipality);
  }

  async getAll(): Promise<MunicipalityDto[]> {
    return (await this.municipality.find({}, {}, { lean: true })).map(
      (v) => v as unknown as MunicipalityDto,
    );
  }
}

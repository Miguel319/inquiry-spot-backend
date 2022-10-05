import {
  Formatter,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Sector } from "@/common/domain/entities";
import { SectorDto } from "@/common/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { SectorDocument, SectorSchema } from "../../schemas";

@Injectable()
export class SectorDtoRepository {
  constructor(
    @InjectModel(SectorSchema.name)
    private readonly sector: Model<SectorSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<SectorSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<SectorDto>> {
    const query = Formatter.formatQuery(entityFilterQuery);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.sector as any).paginate({ ...query }, { ...options });
  }

  private createSectorDto(sector: SectorDocument): SectorDto {
    return SectorDto.create(sector as unknown as Sector);
  }

  async getById(_id: string): Promise<SectorDto | null> {
    const sector = await this.sector.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!sector) return null;

    return this.createSectorDto(sector);
  }

  async getAll(): Promise<SectorDto[]> {
    return (await this.sector.find({}, {}, { lean: true })).map(
      (v) => v as unknown as SectorDto,
    );
  }
}

import {
  Formatter,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Province } from "@/common/domain/entities";
import { ProvinceDto } from "@/common/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { ProvinceDocument, ProvinceSchema } from "../../schemas";

@Injectable()
export class ProvinceDtoRepository {
  constructor(
    @InjectModel(ProvinceSchema.name)
    private readonly province: Model<ProvinceSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<ProvinceSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<ProvinceDto>> {
    const query = Formatter.formatQuery(entityFilterQuery);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.province as any).paginate({ ...query }, { ...options });
  }

  private createProvinceDto(province: ProvinceDocument): ProvinceDto {
    return ProvinceDto.create(province as unknown as Province);
  }

  async getById(_id: string): Promise<ProvinceDto | null> {
    const province = await this.province.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!province) return null;

    return this.createProvinceDto(province);
  }

  async getAll(): Promise<ProvinceDto[]> {
    return (await this.province.find({}, {}, { lean: true })).map(
      (v) => v as unknown as ProvinceDto,
    );
  }
}

import {
  Formatter,
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Color } from "@/common/domain/entities";
import { ColorDto } from "@/common/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { ColorDocument, ColorSchema } from "../../schemas";

@Injectable()
export class ColorDtoRepository {
  constructor(
    @InjectModel(ColorSchema.name)
    private readonly color: Model<ColorSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<ColorSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<ColorDto>> {
    const query = Formatter.formatQuery(entityFilterQuery);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.color as any).paginate({ ...query }, { ...options });
  }

  private createColorDto(color: ColorDocument): ColorDto {
    return ColorDto.create(color as unknown as Color);
  }

  async getById(_id: string): Promise<ColorDto | null> {
    const color = await this.color.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!color) return null;

    return this.createColorDto(color);
  }

  async getAll(): Promise<ColorDto[]> {
    return (await this.color.find({}, {}, { lean: true })).map(
      (v) => v as unknown as ColorDto,
    );
  }
}

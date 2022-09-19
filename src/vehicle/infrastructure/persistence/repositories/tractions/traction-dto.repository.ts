import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Traction } from "@/vehicle/domain/entities";
import { TractionDto } from "@/vehicle/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { TractionDocument, TractionSchema } from "../../schemas";

@Injectable()
export class TractionDtoRepository {
  constructor(
    @InjectModel(TractionSchema.name)
    private readonly traction: Model<TractionSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<TractionSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<TractionDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.traction as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createTractionDto(traction: TractionDocument): TractionDto {
    return TractionDto.create(traction as unknown as Traction);
  }

  async getById(_id: string): Promise<TractionDto | null> {
    const traction = await this.traction.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!traction) return null;

    return this.createTractionDto(traction);
  }

  async getAll(): Promise<TractionDto[]> {
    return (await this.traction.find({}, {}, { lean: true })).map(
      (v) => v as unknown as TractionDto,
    );
  }
}

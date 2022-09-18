import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Fuel } from "@/vehicle-post/domain/entities";
import { FuelDto } from "@/vehicle-post/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { FuelDocument, FuelSchema } from "../../schemas";

@Injectable()
export class FuelDtoRepository {
  constructor(
    @InjectModel(FuelSchema.name)
    private readonly fuel: Model<FuelSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<FuelSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<FuelDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.fuel as any).paginate({ ...entityFilterQuery }, { options });
  }

  private createFuelDto(fuel: FuelDocument): FuelDto {
    return FuelDto.create(fuel as unknown as Fuel);
  }

  async getById(_id: string): Promise<FuelDto | null> {
    const fuel = await this.fuel.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!fuel) return null;

    return this.createFuelDto(fuel);
  }

  async getAll(): Promise<FuelDto[]> {
    return (await this.fuel.find({}, {}, { lean: true })).map(
      (v) => v as unknown as FuelDto,
    );
  }
}

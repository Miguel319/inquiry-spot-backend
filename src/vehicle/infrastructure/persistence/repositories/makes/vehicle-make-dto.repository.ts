import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleMake } from "@/vehicle/domain/entities";
import { VehicleMakeDto } from "@/vehicle/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { VehicleMakeDocument, VehicleMakeSchema } from "../../schemas";

@Injectable()
export class VehicleMakeDtoRepository {
  constructor(
    @InjectModel(VehicleMakeSchema.name)
    private readonly vehicleMake: Model<VehicleMakeSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<VehicleMakeSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<VehicleMakeDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.vehicleMake as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createVehicleMakeDto(
    vehicleMake: VehicleMakeDocument,
  ): VehicleMakeDto {
    return VehicleMakeDto.create(vehicleMake as unknown as VehicleMake);
  }

  async getById(_id: string): Promise<VehicleMakeDto | null> {
    const vehicleMake = await this.vehicleMake.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!vehicleMake) return null;

    return this.createVehicleMakeDto(vehicleMake);
  }

  async getAll(): Promise<VehicleMakeDto[]> {
    return (await this.vehicleMake.find({}, {}, { lean: true })).map(
      (v) => v as unknown as VehicleMakeDto,
    );
  }
}

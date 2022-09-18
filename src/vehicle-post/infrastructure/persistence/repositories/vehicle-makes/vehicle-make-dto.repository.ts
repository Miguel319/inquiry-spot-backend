import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleMake } from "@/vehicle-post/domain/entities";
import { VehicleMakeDto } from "@/vehicle-post/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { VehicleMakeDocument, VehicleMakeSchema } from "../../schemas";

@Injectable()
export class VehicleMakeDtoRepository {
  constructor(
    @InjectModel(VehicleMakeSchema.name)
    private readonly vehicleType: Model<VehicleMakeSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<VehicleMakeSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<VehicleMakeDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.vehicleType as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createVehicleMakeDto(
    vehicleType: VehicleMakeDocument,
  ): VehicleMakeDto {
    return VehicleMakeDto.create(vehicleType as unknown as VehicleMake);
  }

  async getById(_id: string): Promise<VehicleMakeDto | null> {
    const vehicleType = await this.vehicleType.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!vehicleType) return null;

    return this.createVehicleMakeDto(vehicleType);
  }

  async getAll(): Promise<VehicleMakeDto[]> {
    return (await this.vehicleType.find({}, {}, { lean: true })).map(
      (v) => v as unknown as VehicleMakeDto,
    );
  }
}

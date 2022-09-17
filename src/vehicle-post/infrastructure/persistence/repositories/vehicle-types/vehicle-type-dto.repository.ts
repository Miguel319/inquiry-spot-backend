import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleType } from "@/vehicle-post/domain/entities";
import { VehicleTypeDto } from "@/vehicle-post/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { VehicleTypeDocument, VehicleTypeSchema } from "../../schemas";

@Injectable()
export class VehicleTypeDtoRepository {
  constructor(
    @InjectModel(VehicleTypeSchema.name)
    private readonly vehicleType: Model<VehicleTypeSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<VehicleTypeSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<VehicleTypeDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.vehicleType as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createVehicleTypeDto(
    vehicleType: VehicleTypeDocument,
  ): VehicleTypeDto {
    return VehicleTypeDto.create(vehicleType as unknown as VehicleType);
  }

  async getById(_id: string): Promise<VehicleTypeDto | null> {
    const vehicleType = await this.vehicleType.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!vehicleType) return null;

    return this.createVehicleTypeDto(vehicleType);
  }

  async getAll(): Promise<VehicleTypeDto[]> {
    return (await this.vehicleType.find({}, {}, { lean: true })).map(
      (v) => v as unknown as VehicleTypeDto,
    );
  }
}

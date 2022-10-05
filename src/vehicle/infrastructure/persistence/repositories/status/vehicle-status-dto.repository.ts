import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehicleStatus } from "@/vehicle/domain/entities";
import { VehicleStatusDto } from "@/vehicle/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { VehicleStatusDocument, VehicleStatusSchema } from "../../schemas";

@Injectable()
export class VehicleStatusDtoRepository {
  constructor(
    @InjectModel(VehicleStatusSchema.name)
    private readonly vehicleStatus: Model<VehicleStatusSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<VehicleStatusSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<VehicleStatusDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.vehicleStatus as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createVehicleStatusDto(
    vehicleStatus: VehicleStatusDocument,
  ): VehicleStatusDto {
    return VehicleStatusDto.create(vehicleStatus as unknown as VehicleStatus);
  }

  async getById(_id: string): Promise<VehicleStatusDto | null> {
    const vehicleStatus = await this.vehicleStatus.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!vehicleStatus) return null;

    return this.createVehicleStatusDto(vehicleStatus);
  }

  async getAll(): Promise<VehicleStatusDto[]> {
    return (await this.vehicleStatus.find({}, {}, { lean: true })).map(
      (v) => v as unknown as VehicleStatusDto,
    );
  }
}

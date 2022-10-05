import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { VehiclePost } from "@/vehicle/domain/entities";
import { VehiclePostDto } from "@/vehicle/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { VehiclePostDocument, VehiclePostSchema } from "../../schemas";

@Injectable()
export class VehiclePostDtoRepository {
  constructor(
    @InjectModel(VehiclePostSchema.name)
    private readonly vehiclePost: Model<VehiclePostSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<VehiclePostSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<VehiclePostDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.vehiclePost as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createVehiclePostDto(
    vehiclePost: VehiclePostDocument,
  ): VehiclePostDto {
    return VehiclePostDto.create(vehiclePost as unknown as VehiclePost);
  }

  async getById(_id: string): Promise<VehiclePostDto | null> {
    const vehiclePost = await this.vehiclePost.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!vehiclePost) return null;

    return this.createVehiclePostDto(vehiclePost);
  }

  async getAll(): Promise<VehiclePostDto[]> {
    return (await this.vehiclePost.find({}, {}, { lean: true })).map(
      (v) => v as unknown as VehiclePostDto,
    );
  }
}

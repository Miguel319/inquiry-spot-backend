import { EntityFactory } from "@/common/infrastructure/factories";
import { VehiclePostCreatedEvent } from "@/vehicle/application/events";
import { IVehiclePostsService } from "@/vehicle/application/services/contracts";
import { VehiclePost } from "@/vehicle/domain/entities";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateVehiclePostDto } from "../../dtos";
import { VehiclePostSchema } from "../../persistence/schemas";
import { VehiclePostSchemaFactory } from "./vehicle-post-schema.factory";

@Injectable()
export class VehiclePostFactory implements EntityFactory<VehiclePost> {
  constructor(
    @InjectModel(VehiclePostSchema.name)
    private readonly _vehiclePostModel: Model<VehiclePostSchema>,
    @Inject("IVehiclePostsService")
    private readonly _vehiclePostsService: IVehiclePostsService,
    private readonly _vehiclePostFactory: VehiclePostSchemaFactory,
  ) {}

  private buildAddress(dto: CreateVehiclePostDto) {
    const formal = dto.isFormalAddress
      ? {
          municipality: {
            _id: dto.formalAddress.municipality,
          },
          province: {
            _id: dto.formalAddress.province,
          },
          sector: {
            _id: dto.formalAddress.sector,
          },
        }
      : undefined;

    const informal = dto.isFormalAddress ? dto.informalAddress : undefined;

    return {
      formal,
      informal,
    };
  }

  private buildAdditionalProps(dto: CreateVehiclePostDto) {
    return {
      make: {
        _id: dto.make,
      },
      interiorColor: {
        _id: dto.interiorColor,
      },
      exteriorColor: {
        _id: dto.exteriorColor,
      },
      fuelType: {
        _id: dto.fuelType,
      },
      traction: {
        _id: dto.traction,
      },
      transmission: {
        _id: dto.transmission,
      },
      status: {
        _id: dto.status,
      },
      type: {
        _id: dto.type,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(...args: any[]): Promise<VehiclePost> {
    const dto = args[0] as CreateVehiclePostDto;

    const vehiclePost = new VehiclePost({
      ...args[0],
      address: this.buildAddress(dto),
      ...this.buildAdditionalProps(dto),
      _id: new Types.ObjectId().toHexString(),
    });

    await this._vehiclePostsService.mapToEntities(
      vehiclePost,
      args[1],
      "create",
    );

    console.log("make", vehiclePost.getMake().value);

    await this._vehiclePostModel.create(
      this._vehiclePostFactory.create(vehiclePost),
    );

    vehiclePost.apply(new VehiclePostCreatedEvent(vehiclePost.getId()));

    return vehiclePost;
  }
}

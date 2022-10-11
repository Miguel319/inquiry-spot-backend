import { EntityFactory } from "@/common/infrastructure/factories";
import { PropertyPostCreatedEvent } from "@/real-state/application/events";
import { IPropertyPostsService } from "@/real-state/application/services/contracts";
import { PropertyPost } from "@/real-state/domain/entities";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PropertyPostSchemaFactory } from ".";
import { CreatePropertyPostDto } from "../../dtos";
import { PropertyPostSchema } from "../../persistence/schemas";

@Injectable()
export class PropertyPostFactory implements EntityFactory<PropertyPost> {
  constructor(
    @InjectModel(PropertyPostSchema.name)
    private readonly _vehiclePostModel: Model<PropertyPostSchema>,
    @Inject("IPropertyPostsService")
    private readonly _vehiclePostsService: IPropertyPostsService,
    private readonly _vehiclePostFactory: PropertyPostSchemaFactory,
  ) {}

  private buildAddress(dto: CreatePropertyPostDto) {
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

  private buildAdditionalProps(dto: CreatePropertyPostDto) {
    return {
      interiorColor: {
        _id: dto.interiorColor,
      },
      exteriorColor: {
        _id: dto.exteriorColor,
      },
      buyingOption: {
        _id: dto.buyingOption,
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
  async create(...args: any[]): Promise<PropertyPost> {
    const dto = args[0] as CreatePropertyPostDto;

    const vehiclePost = new PropertyPost({
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

    await this._vehiclePostModel.create(
      this._vehiclePostFactory.create(vehiclePost),
    );

    vehiclePost.apply(new PropertyPostCreatedEvent(vehiclePost.getId()));

    return vehiclePost;
  }
}

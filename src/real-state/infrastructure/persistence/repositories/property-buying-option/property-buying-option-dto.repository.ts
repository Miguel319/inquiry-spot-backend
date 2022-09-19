import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { PropertyBuyingOption } from "@/real-state/domain/entities";
import { PropertyBuyingOptionDto } from "@/real-state/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import {
  PropertyBuyingOptionDocument,
  PropertyBuyingOptionSchema,
} from "../../schemas";

@Injectable()
export class PropertyBuyingOptionDtoRepository {
  constructor(
    @InjectModel(PropertyBuyingOptionSchema.name)
    private readonly propertyStatus: Model<PropertyBuyingOptionSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<PropertyBuyingOptionSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<PropertyBuyingOptionDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.propertyStatus as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createPropertyBuyingOptionDto(
    propertyStatus: PropertyBuyingOptionDocument,
  ): PropertyBuyingOptionDto {
    return PropertyBuyingOptionDto.create(
      propertyStatus as unknown as PropertyBuyingOption,
    );
  }

  async getById(_id: string): Promise<PropertyBuyingOptionDto | null> {
    const propertyStatus = await this.propertyStatus.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!propertyStatus) return null;

    return this.createPropertyBuyingOptionDto(propertyStatus);
  }

  async getAll(): Promise<PropertyBuyingOptionDto[]> {
    return (await this.propertyStatus.find({}, {}, { lean: true })).map(
      (v) => v as unknown as PropertyBuyingOptionDto,
    );
  }
}

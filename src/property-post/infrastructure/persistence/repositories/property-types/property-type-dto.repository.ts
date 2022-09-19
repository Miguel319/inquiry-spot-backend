import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { PropertyType } from "@/property-post/domain/entities";
import { PropertyTypeDto } from "@/property-post/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { PropertyTypeDocument, PropertyTypeSchema } from "../../schemas";

@Injectable()
export class PropertyTypeDtoRepository {
  constructor(
    @InjectModel(PropertyTypeSchema.name)
    private readonly propertyType: Model<PropertyTypeSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<PropertyTypeSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<PropertyTypeDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.propertyType as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createPropertyTypeDto(
    propertyType: PropertyTypeDocument,
  ): PropertyTypeDto {
    return PropertyTypeDto.create(propertyType as unknown as PropertyType);
  }

  async getById(_id: string): Promise<PropertyTypeDto | null> {
    const propertyType = await this.propertyType.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!propertyType) return null;

    return this.createPropertyTypeDto(propertyType);
  }

  async getAll(): Promise<PropertyTypeDto[]> {
    return (await this.propertyType.find({}, {}, { lean: true })).map(
      (v) => v as unknown as PropertyTypeDto,
    );
  }
}

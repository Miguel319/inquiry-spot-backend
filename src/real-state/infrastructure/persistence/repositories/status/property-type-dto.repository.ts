import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { PropertyStatus } from "@/real-state/domain/entities";
import { PropertyStatusDto } from "@/real-state/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { PropertyStatusDocument, PropertyStatusSchema } from "../../schemas";

@Injectable()
export class PropertyStatusDtoRepository {
  constructor(
    @InjectModel(PropertyStatusSchema.name)
    private readonly propertyStatus: Model<PropertyStatusSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<PropertyStatusSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<PropertyStatusDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.propertyStatus as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  private createPropertyStatusDto(
    propertyStatus: PropertyStatusDocument,
  ): PropertyStatusDto {
    return PropertyStatusDto.create(
      propertyStatus as unknown as PropertyStatus,
    );
  }

  async getById(_id: string): Promise<PropertyStatusDto | null> {
    const propertyStatus = await this.propertyStatus.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!propertyStatus) return null;

    return this.createPropertyStatusDto(propertyStatus);
  }

  async getAll(): Promise<PropertyStatusDto[]> {
    return (await this.propertyStatus.find({}, {}, { lean: true })).map(
      (v) => v as unknown as PropertyStatusDto,
    );
  }
}

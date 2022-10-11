import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { IPropertyPost } from "@/real-state/domain";
import { PropertyPost } from "@/real-state/domain/entities";
import {
  AllPropertyPostsDto,
  PropertyPostDto,
} from "@/real-state/infrastructure/dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { PropertyPostDocument, PropertyPostSchema } from "../../schemas";

@Injectable()
export class PropertyPostDtoRepository {
  constructor(
    @InjectModel(PropertyPostSchema.name)
    private readonly propertyPost: Model<PropertyPostSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<PropertyPostSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<AllPropertyPostsDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts = (await (this.propertyPost as any).paginate(
      { ...entityFilterQuery },
      { options },
    )) as PaginatedQuery<IPropertyPost>;

    const postList = { ...posts }.docs.map((v) =>
      AllPropertyPostsDto.create(v),
    );

    return { ...posts, docs: postList };
  }

  private createPropertyPostDto(
    propertyPost: PropertyPostDocument,
  ): PropertyPostDto {
    return PropertyPostDto.create(propertyPost as unknown as PropertyPost);
  }

  async getById(_id: string): Promise<PropertyPostDto | null> {
    const propertyPost = await this.propertyPost.findOne(
      { _id: new Types.ObjectId(_id) },
      {},
      { lean: true },
    );

    if (!propertyPost) return null;

    return this.createPropertyPostDto(propertyPost);
  }

  async getAll(limit?: number): Promise<AllPropertyPostsDto[]> {
    return (await this.propertyPost.find({}, {}, { lean: true, limit })).map(
      (v) => AllPropertyPostsDto.create(v as unknown as IPropertyPost),
    );
  }
}

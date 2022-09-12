import {
  PaginatedQuery,
  PaginationOptions,
} from "@/common/infrastructure/util";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { BlogDto } from "../../dtos";
import { BlogSchema } from "../schemas";

@Injectable()
export class BlogDtoRepository {
  constructor(
    @InjectModel(BlogSchema.name) private readonly blogModel: Model<BlogSchema>,
  ) {}

  async getPaginated(
    entityFilterQuery: FilterQuery<BlogSchema>,
    options: PaginationOptions,
  ): Promise<PaginatedQuery<BlogDto>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.blogModel as any).paginate(
      { ...entityFilterQuery },
      { options },
    );
  }

  async getAll() {
    return (await this.blogModel.find({})).map((v) => v);
  }
}

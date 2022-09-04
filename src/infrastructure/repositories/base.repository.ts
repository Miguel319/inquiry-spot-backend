import { IRepository } from "../../application/repositories";
import {
  AnyKeys,
  AnyObject,
  PipelineStage,
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { PaginationOptions } from "../common/util";

export abstract class BaseRepository<T extends Document>
  implements IRepository<T>
{
  constructor(protected readonly entityModel: Model<T>) {}

  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    select?: QueryOptions | null,
  ): Promise<T | null> {
    if (select) {
      return this.entityModel
        .findOne(
          { ...entityFilterQuery },
          {
            __v: 0,
            ...projection,
          },
          select,
        )
        .select(select)
        .exec();
    }

    return this.entityModel
      .findOne(
        { ...entityFilterQuery },
        {
          __v: 0,
          ...projection,
        },
      )
      .exec();
  }

  async aggregate(
    pipeline?: PipelineStage[] | undefined,
    options?: Record<string, unknown> | undefined,
  ) {
    return this.entityModel.aggregate(pipeline, options);
  }

  async find(entityFilterQuery: FilterQuery<T>, select?: string): Promise<T[]> {
    if (select)
      return this.entityModel
        .find(entityFilterQuery, {
          __v: 0,
        })
        .select(select);

    return this.entityModel.find(entityFilterQuery, {
      __v: 0,
    });
  }

  async paginate(
    entityFilterQuery: FilterQuery<T>,
    options: PaginationOptions,
  ): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.entityModel as any).paginate(
      { entityFilterQuery },
      { options },
    );
  }

  async create(
    createEntityData: (AnyKeys<T> & AnyObject) | undefined,
  ): Promise<T> {
    const entity = new this.entityModel(createEntityData);

    return (await entity.save()) as T;
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteOne(entityFilterQuery);

    return deleteResult.deletedCount >= 1;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);

    return deleteResult.deletedCount >= 1;
  }
}

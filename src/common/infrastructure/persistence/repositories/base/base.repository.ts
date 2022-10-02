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
import { PaginationOptions } from "@/common/infrastructure/util";
import { IDocumentRepository } from "@/common/application/repositories";

export abstract class BaseRepository<T extends Document>
  implements IDocumentRepository<T>
{
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
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

  async findLimited(
    entityFilterQuery: FilterQuery<T>,
    limit: number,
    select?: string,
  ): Promise<T[]> {
    if (select)
      return this.entityModel
        .find(entityFilterQuery, {
          __v: 0,
        })
        .select(select)
        .limit(limit);

    return this.entityModel
      .find(entityFilterQuery, {
        __v: 0,
      })
      .limit(limit);
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
      { ...entityFilterQuery },
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

    if (!deleteResult) return false;

    return deleteResult.deletedCount >= 1;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);

    if (!deleteResult) return false;

    return deleteResult.deletedCount >= 1;
  }
}

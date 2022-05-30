import { IRepository } from "@/application/repositories";
import { PipelineStage } from "mongoose";
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export abstract class BaseRepository<T extends Document>
  implements IRepository<T>
{
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    select?: QueryOptions | null,
  ): Promise<T | null> {
    if (select) {
      return await this.entityModel
        .findOne(
          { ...entityFilterQuery },
          {
            __v: 0,
            ...projection,
          },
          select as QueryOptions,
        )
        .select(select)
        .exec();
    }

    return await this.entityModel
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
    return await this.entityModel.aggregate(pipeline, options);
  }

  async find(entityFilterQuery: FilterQuery<T>, select?: string): Promise<T[]> {
    if (select) {
      return await this.entityModel
        .find(entityFilterQuery, {
          __v: 0,
        })
        .select(select);
    }

    return await this.entityModel.find(entityFilterQuery, {
      __v: 0,
    });
  }

  async create(
    createEntityData: (AnyKeys<T> & AnyObject) | undefined,
  ): Promise<T> {
    const entity: Document<
      T,
      Record<string, unknown>,
      Record<string, unknown>
    > = new this.entityModel(createEntityData);

    return (await entity.save()) as T;
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<HydratedDocument<
    T,
    Record<string, unknown>,
    Record<string, unknown>
  > | null> {
    return await this.entityModel.findOneAndUpdate(
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

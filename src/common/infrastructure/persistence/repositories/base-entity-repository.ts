import { AggregateRoot } from "@nestjs/cqrs";
import { FilterQuery, Types } from "mongoose";
import { BaseSchema } from "../schemas";
import { EntityRepository } from "./entity.repository";

export abstract class BaseEntityRepository<
  TSchema extends BaseSchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findByValue(
    value: string,
    queryBy: "slug" | "_id",
  ): Promise<TEntity | null> {
    return this.findOne({
      [queryBy]: queryBy === "_id" ? new Types.ObjectId(value) : value,
    } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceByValue(
    value: string,
    queryBy: "slug" | "_id",
    entity: TEntity,
  ): Promise<void> {
    this.findOneAndReplace(
      {
        [queryBy]: queryBy === "_id" ? new Types.ObjectId(value) : value,
      } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({}) as unknown as TEntity[];
  }
}

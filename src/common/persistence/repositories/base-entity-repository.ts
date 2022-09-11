import { AggregateRoot } from "@nestjs/cqrs";
import { FilterQuery, Types } from "mongoose";
import { IdEntitySchema } from "../schemas/id-entity.schema";
import { EntityRepository } from "./entity.repository";

export abstract class BaseEntityRepository<
  TSchema extends IdEntitySchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({
      _id: new Types.ObjectId(id),
    } as FilterQuery<TSchema>);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndReplace(
      { _id: new Types.ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}

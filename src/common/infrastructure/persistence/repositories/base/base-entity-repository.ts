import { AggregateRoot } from "@nestjs/cqrs";
import { FilterQuery, Types } from "mongoose";
import { BaseSchema } from "../../schemas";
import { EntityRepository } from "./entity.repository";

export abstract class BaseEntityRepository<
  TSchema extends BaseSchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findByValue(
    value: string | Types.ObjectId,
    queryBy: "slug" | "_id",
  ): Promise<TEntity | null> {
    return await this.findOne({
      [queryBy]: queryBy === "_id" ? new Types.ObjectId(value) : value,
    } as FilterQuery<TSchema>);
  }

  findOneEntity(entityFilterQuery?: FilterQuery<TSchema>) {
    return this.findOne(entityFilterQuery);
  }

  async findOneAndReplaceByValue(
    value: string,
    queryBy: "slug" | "_id",
    entity: TEntity,
  ): Promise<void> {
    const hasCommas = typeof value === "string" && value.includes(",");

    const formattedValue = hasCommas ? value.replace(",", "") : value;

    await this.findOneAndReplace(
      {
        [queryBy]:
          queryBy === "_id"
            ? new Types.ObjectId(formattedValue)
            : formattedValue,
      } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity[],
  ): Promise<void> {
    await this.findManyAndReplace(entityFilterQuery, entity);
  }

  async delete(value: string, queryBy: "slug" | "_id") {
    const query = {
      [queryBy]: queryBy === "_id" ? new Types.ObjectId(value) : value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const deletedEntity = await this.entityModel.deleteOne(query);

    return deletedEntity.deletedCount > 0;
  }

  async findAll(entityFilterQuery?: FilterQuery<TSchema>): Promise<TEntity[]> {
    return this.find(entityFilterQuery) as unknown as TEntity[];
  }
}

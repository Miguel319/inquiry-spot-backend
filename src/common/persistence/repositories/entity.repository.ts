import { AggregateRoot } from "@nestjs/cqrs";
import { FilterQuery, HydratedDocument, Model } from "mongoose";
import { EntitySchemaFactory } from "../factories/entity-schema.factory";
import { BaseSchema } from "../schemas";

export abstract class EntityRepository<
  TSchema extends BaseSchema,
  TEntity extends AggregateRoot,
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  protected async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity | null> {
    const entityDocument = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  protected async find(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<(TEntity | null)[]> {
    return (
      await this.entityModel.find(
        entityFilterQuery as FilterQuery<TSchema>,
        {},
        { lean: true },
      )
    ).map((entityDocument) =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }
  async create(
    entity: TEntity,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<HydratedDocument<TSchema, {}, unknown>> {
    const newEntity = new this.entityModel(
      this.entitySchemaFactory.create(entity),
    );

    await newEntity.save();

    return newEntity;
  }

  protected async findOneAndReplace(
    entityFilterQuery: FilterQuery<TSchema>,
    entity: TEntity,
  ) {
    return this.entityModel.findOneAndReplace(
      entityFilterQuery,
      this.entitySchemaFactory.create(entity) as unknown as TEntity,
      {
        new: true,
        useFindAndModify: false,
        lean: true,
      },
    );
  }
}

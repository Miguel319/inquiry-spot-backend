import { AggregateRoot } from "@nestjs/cqrs";
import { IdEntitySchema } from "../schemas/id-entity.schema";

export interface EntitySchemaFactory<
  TSchema extends IdEntitySchema,
  TEntity extends AggregateRoot,
> {
  create(entity?: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema | null): TEntity;
}

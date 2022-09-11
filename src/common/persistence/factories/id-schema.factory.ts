import { AggregateRoot } from "@nestjs/cqrs";
import { BaseSchema } from "../schemas";

export interface EntitySchemaFactory<
  TSchema extends BaseSchema,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity | null): TSchema | null;
  createFromSchema(entitySchema: TSchema | null): TEntity | null;
}

import { AggregateRoot } from "@nestjs/cqrs";
import { BaseSchema } from "../../schemas";

export interface EntitySchemaFactory<
  TSchema extends BaseSchema,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema | null): TEntity | null;
}

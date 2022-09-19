import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PropertyTypeCreatedEvent } from "../..";

@EventsHandler(PropertyTypeCreatedEvent)
export class PropertyTypeCreatedEventHandler
  implements IEventHandler<PropertyTypeCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ propertyTypeId, name }: PropertyTypeCreatedEvent) {
    this._logger.log(
      "Property type creation",
      `✅ New property type created successfully! ID = ${propertyTypeId}. Name = ${JSON.stringify(
        name,
      )}`,
    );
  }
}

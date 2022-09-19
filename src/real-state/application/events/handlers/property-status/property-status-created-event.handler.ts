import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PropertyStatusCreatedEvent } from "../..";

@EventsHandler(PropertyStatusCreatedEvent)
export class PropertyStatusCreatedEventHandler
  implements IEventHandler<PropertyStatusCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ propertyStatusId, name }: PropertyStatusCreatedEvent) {
    this._logger.log(
      "Property status creation",
      `✅ New property status created successfully! ID = ${propertyStatusId}. Name = ${name.en}`,
    );
  }
}

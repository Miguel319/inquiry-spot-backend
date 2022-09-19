import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PropertyBuyingOptionCreatedEvent } from "../..";

@EventsHandler(PropertyBuyingOptionCreatedEvent)
export class PropertyBuyingOptionCreatedEventHandler
  implements IEventHandler<PropertyBuyingOptionCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ propertyStatusId, name }: PropertyBuyingOptionCreatedEvent) {
    this._logger.log(
      "Property buying option creation",
      `✅ New property buying option created successfully! ID = ${propertyStatusId}. Name = ${name.en}`,
    );
  }
}

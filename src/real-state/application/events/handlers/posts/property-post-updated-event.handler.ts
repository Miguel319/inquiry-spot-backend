import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PropertyPostUpdatedEvent } from "../../operations";

@EventsHandler(PropertyPostUpdatedEvent)
export class PropertyPostUpdatedEventHandler
  implements IEventHandler<PropertyPostUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ postId }: PropertyPostUpdatedEvent) {
    this._logger.log(
      "PropertyPost update",
      `✅ New vehicle post updated successfully! ID = ${postId}.`,
    );
  }
}

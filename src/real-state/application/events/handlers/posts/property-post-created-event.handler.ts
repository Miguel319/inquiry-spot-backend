import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PropertyPostCreatedEvent } from "../../operations";

@EventsHandler(PropertyPostCreatedEvent)
export class PropertyPostCreatedEventHandler
  implements IEventHandler<PropertyPostCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  public handle({ postId }: PropertyPostCreatedEvent) {
    this._logger.log(
      "PropertyPost creation",
      `✅ PropertyPost created successfully! ID = ${postId}`,
    );
  }
}

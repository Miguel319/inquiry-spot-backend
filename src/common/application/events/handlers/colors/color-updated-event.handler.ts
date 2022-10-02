import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ColorUpdatedEvent } from "../../operations";

@EventsHandler(ColorUpdatedEvent)
export class ColorUpdatedEventHandler
  implements IEventHandler<ColorUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ colorId, newName }: ColorUpdatedEvent) {
    this._logger.log(
      "Color update",
      `✅ New color updated successfully! ID = ${colorId}. Name = ${newName.en} `,
    );
  }
}

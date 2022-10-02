import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ColorCreatedEvent } from "../operations";

@EventsHandler(ColorCreatedEvent)
export class ColorCreatedEventHandler
  implements IEventHandler<ColorCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ colorId, name }: ColorCreatedEvent) {
    this._logger.log(
      "Color creation",
      `✅ New color type created successfully! ID = ${colorId}. Name = ${name.en}`,
    );
  }
}

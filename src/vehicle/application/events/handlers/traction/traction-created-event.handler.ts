import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TractionCreatedEvent } from "../..";

@EventsHandler(TractionCreatedEvent)
export class TractionCreatedEventHandler
  implements IEventHandler<TractionCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ tractionId, name }: TractionCreatedEvent) {
    this._logger.log(
      "Traction creation",
      `✅ New traction created successfully! ID = ${tractionId}. Name = ${name.en}`,
    );
  }
}

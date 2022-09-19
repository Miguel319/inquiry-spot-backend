import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TransmissionCreatedEvent } from "../..";

@EventsHandler(TransmissionCreatedEvent)
export class TransmissionCreatedEventHandler
  implements IEventHandler<TransmissionCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ transmissionId, name }: TransmissionCreatedEvent) {
    this._logger.log(
      "Transmission creation",
      `✅ New transmission created successfully! ID = ${transmissionId}. Name = ${name}`,
    );
  }
}

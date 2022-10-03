import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MunicipalityCreatedEvent } from "../../operations";

@EventsHandler(MunicipalityCreatedEvent)
export class MunicipalityCreatedEventHandler
  implements IEventHandler<MunicipalityCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ municipalityId, name }: MunicipalityCreatedEvent) {
    this._logger.log(
      "Municipality creation",
      `✅ New municipality type created successfully! ID = ${String(
        municipalityId,
      )}. Name = ${name}`,
    );
  }
}

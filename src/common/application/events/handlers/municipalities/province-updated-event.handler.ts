import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MunicipalityUpdatedEvent } from "../../operations";

@EventsHandler(MunicipalityUpdatedEvent)
export class MunicipalityUpdatedEventHandler
  implements IEventHandler<MunicipalityUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ municipalityId, newName }: MunicipalityUpdatedEvent) {
    this._logger.log(
      "Municipality update",
      `✅ New municipality updated successfully! ID = ${municipalityId}. Name = ${newName} `,
    );
  }
}

import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SectorCreatedEvent } from "../../operations";

@EventsHandler(SectorCreatedEvent)
export class SectorCreatedEventHandler
  implements IEventHandler<SectorCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ sectorId, name }: SectorCreatedEvent) {
    this._logger.log(
      "Sector creation",
      `✅ New sector type created successfully! ID = ${String(
        sectorId,
      )}. Name = ${name}`,
    );
  }
}

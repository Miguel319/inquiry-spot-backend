import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SectorUpdatedEvent } from "../../operations";

@EventsHandler(SectorUpdatedEvent)
export class SectorUpdatedEventHandler
  implements IEventHandler<SectorUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ sectorId, newName }: SectorUpdatedEvent) {
    this._logger.log(
      "Sector update",
      `✅ New sector updated successfully! ID = ${sectorId}. Name = ${newName} `,
    );
  }
}

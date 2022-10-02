import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProvinceUpdatedEvent } from "../../operations";

@EventsHandler(ProvinceUpdatedEvent)
export class ProvinceUpdatedEventHandler
  implements IEventHandler<ProvinceUpdatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ provinceId, newName }: ProvinceUpdatedEvent) {
    this._logger.log(
      "Province update",
      `✅ New province updated successfully! ID = ${provinceId}. Name = ${newName.en} `,
    );
  }
}

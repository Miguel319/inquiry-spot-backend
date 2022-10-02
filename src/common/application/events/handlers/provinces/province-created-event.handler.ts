import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProvinceCreatedEvent } from "../../operations";

@EventsHandler(ProvinceCreatedEvent)
export class ProvinceCreatedEventHandler
  implements IEventHandler<ProvinceCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ provinceId, name }: ProvinceCreatedEvent) {
    this._logger.log(
      "Province creation",
      `✅ New province type created successfully! ID = ${provinceId}. Name = ${name.en}`,
    );
  }
}

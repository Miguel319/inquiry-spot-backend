import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { RoleCreatedEvent } from "../../operations";

@EventsHandler(RoleCreatedEvent)
export class RoleCreatedEventHandler
  implements IEventHandler<RoleCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  public handle({ roleId }: RoleCreatedEvent) {
    this._logger.log(
      "Role creation",
      `✅ Role created successfully! ID = ${roleId}`,
    );
  }
}

import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { PropertyStatusCreatedEvent } from "../..";

@EventsHandler(PropertyStatusCreatedEvent)
export class PropertyStatusCreatedEventHandler
  implements IEventHandler<PropertyStatusCreatedEvent>
{
  constructor(
    private readonly _logger: LoggerService,
    private readonly _eventEmitter: EventEmitter2,
  ) {}

  async handle(statusCreatedEvent: PropertyStatusCreatedEvent) {
    this._eventEmitter.emit("propertyStatus.created", statusCreatedEvent);
  }

  @OnEvent("propertyStatus.created")
  logCreation(payload: PropertyStatusCreatedEvent) {
    this._logger.log(
      "Property status creation",
      `✅ New property status created successfully! ID = ${payload.propertyStatusId}. Name = ${payload.name.en}`,
    );
  }
}

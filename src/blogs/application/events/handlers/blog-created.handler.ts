import { LoggerService } from "@/common/infrastructure/logger";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BlogCreatedEvent } from "../operations";

@EventsHandler(BlogCreatedEvent)
export class BlogCreatedEventHandler
  implements IEventHandler<BlogCreatedEvent>
{
  constructor(private readonly _logger: LoggerService) {}

  async handle({ blogId }: BlogCreatedEvent) {
    this._logger.log(
      "Blog creation",
      `✅ New blog created successfully. Blog ID: ${blogId}!`,
    );
  }
}

import { ColorFactory } from "@/common/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateColorCommand } from "../..";

@CommandHandler(CreateColorCommand)
export class CreateColorCommandHandler
  implements ICommandHandler<CreateColorCommand>
{
  constructor(
    private readonly colorFactory: ColorFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createColorDto, i18n }: CreateColorCommand): Promise<void> {
    const color = this.eventPublisher.mergeObjectContext(
      await this.colorFactory.create(createColorDto, i18n),
    );

    color.commit();
  }
}

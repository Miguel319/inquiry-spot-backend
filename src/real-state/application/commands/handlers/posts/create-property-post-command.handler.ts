import { PropertyPostFactory } from "@/real-state/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreatePropertyPostCommand } from "../..";

@CommandHandler(CreatePropertyPostCommand)
export class CreatePropertyPostCommandHandler
  implements ICommandHandler<CreatePropertyPostCommand>
{
  constructor(
    private readonly propertyPost: PropertyPostFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createPropertyPostDto,
    i18n,
  }: CreatePropertyPostCommand): Promise<void> {
    const traction = this.eventPublisher.mergeObjectContext(
      await this.propertyPost.create(createPropertyPostDto, i18n),
    );

    traction.commit();
  }
}

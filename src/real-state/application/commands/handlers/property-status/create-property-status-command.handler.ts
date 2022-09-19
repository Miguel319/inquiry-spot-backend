import { PropertyStatusFactory } from "@/real-state/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreatePropertyStatusCommand } from "../..";

@CommandHandler(CreatePropertyStatusCommand)
export class CreatePropertyStatusCommandHandler
  implements ICommandHandler<CreatePropertyStatusCommand>
{
  constructor(
    private readonly propertyStatusFactory: PropertyStatusFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createPropertyStatusDto,
    i18n,
  }: CreatePropertyStatusCommand): Promise<void> {
    const propertyStatus = this.eventPublisher.mergeObjectContext(
      await this.propertyStatusFactory.create(createPropertyStatusDto, i18n),
    );

    propertyStatus.commit();
  }
}

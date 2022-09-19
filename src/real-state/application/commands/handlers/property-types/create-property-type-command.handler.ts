import { PropertyTypeFactory } from "@/real-state/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreatePropertyTypeCommand } from "../..";

@CommandHandler(CreatePropertyTypeCommand)
export class CreatePropertyTypeCommandHandler
  implements ICommandHandler<CreatePropertyTypeCommand>
{
  constructor(
    private readonly propertyTypeFactory: PropertyTypeFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createPropertyTypeDto,
    i18n,
  }: CreatePropertyTypeCommand): Promise<void> {
    const propertyType = this.eventPublisher.mergeObjectContext(
      await this.propertyTypeFactory.create(createPropertyTypeDto, i18n),
    );

    propertyType.commit();
  }
}

import { PropertyBuyingOptionFactory } from "@/real-state/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreatePropertyBuyingOptionCommand } from "../..";

@CommandHandler(CreatePropertyBuyingOptionCommand)
export class CreatePropertyBuyingOptionCommandHandler
  implements ICommandHandler<CreatePropertyBuyingOptionCommand>
{
  constructor(
    private readonly propertyBuyingOptionFactory: PropertyBuyingOptionFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createPropertyBuyingOptionDto,
    i18n,
  }: CreatePropertyBuyingOptionCommand): Promise<void> {
    const propertyBuyingOption = this.eventPublisher.mergeObjectContext(
      await this.propertyBuyingOptionFactory.create(
        createPropertyBuyingOptionDto,
        i18n,
      ),
    );

    propertyBuyingOption.commit();
  }
}

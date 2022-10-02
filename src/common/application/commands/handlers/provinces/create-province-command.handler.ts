import { ProvinceFactory } from "@/common/infrastructure/factories";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateProvinceCommand } from "../..";

@CommandHandler(CreateProvinceCommand)
export class CreateProvinceCommandHandler
  implements ICommandHandler<CreateProvinceCommand>
{
  constructor(
    private readonly provinceFactory: ProvinceFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    createProvinceDto,
    i18n,
  }: CreateProvinceCommand): Promise<void> {
    const province = this.eventPublisher.mergeObjectContext(
      await this.provinceFactory.create(createProvinceDto, i18n),
    );

    province.commit();
  }
}

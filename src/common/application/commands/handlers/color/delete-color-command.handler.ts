import { ColorTranslations } from "@/common/application/translations";
import { Color } from "@/common/domain/entities";
import { ColorEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteColorCommand } from "../..";

@CommandHandler(DeleteColorCommand)
export class DeleteColorCommandHandler
  implements ICommandHandler<DeleteColorCommand>
{
  constructor(
    private readonly _colorEntityRepository: ColorEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getColor(_id: string, i18n: I18nContext): Promise<Color> {
    const color = await this._colorEntityRepository.findByValue(_id, "_id");

    if (!color)
      throw new NotFoundException(
        i18n
          ? i18n.t(ColorTranslations.NOT_FOUND)
          : this._i18n.t(ColorTranslations.NOT_FOUND),
      );

    return color;
  }

  private async handleAuthorization(
    color: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const vehiclePostFound = await this._vehiclePostRepository.findOne({
      "color._id": color,
    });

    if (vehiclePostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(ColorTranslations.FORBIDDEN_DELETION_VEHICLE)
          : this._i18n.t(ColorTranslations.FORBIDDEN_DELETION_VEHICLE),
      );

    const propertyPostFound = await this._propertyPostRepository.findOne({
      "color._id": color,
    });

    if (propertyPostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(ColorTranslations.FORBIDDEN_DELETION_PROPERTY)
          : this._i18n.t(ColorTranslations.FORBIDDEN_DELETION_PROPERTY),
      );
  }

  async execute({ _id, i18n }: DeleteColorCommand): Promise<boolean> {
    const colorFound = await this.getColor(_id, i18n);

    await this.handleAuthorization(colorFound.getId(), i18n);

    const color = this.eventPublisher.mergeObjectContext(colorFound);

    const deleteCount = await this._colorEntityRepository.delete(_id, "_id");

    color.commit();

    return deleteCount;
  }
}

import { PropertyStatusTranslations } from "@/real-state/application/translations";
import { PropertyStatus } from "@/real-state/domain/entities";
import { IPropertyStatus } from "@/real-state/domain/types";
import { UpdatePropertyStatusDto } from "@/real-state/infrastructure/dtos";
import { PropertyStatusEntityRepository } from "@/real-state/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdatePropertyStatusCommand } from "../..";

@CommandHandler(UpdatePropertyStatusCommand)
export class UpdatePropertyStatusCommandHandler
  implements ICommandHandler<UpdatePropertyStatusCommand>
{
  constructor(
    private readonly _propertyStatusRepository: PropertyStatusEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyStatus(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyStatus> {
    const propertyStatus = await this._propertyStatusRepository.findByValue(
      _id,
      "_id",
    );

    if (!propertyStatus)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyStatusTranslations.NOT_FOUND)
          : this._i18n.t(PropertyStatusTranslations.NOT_FOUND),
      );

    return propertyStatus;
  }

  private async checkDuplicates(
    propertyStatus: PropertyStatus,
    updatePropertyStatusDto: UpdatePropertyStatusDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._propertyStatusRepository.findOneEntity({
      $or: [
        { "name.es": updatePropertyStatusDto.name.es },
        { "name.en": updatePropertyStatusDto.name.en },
      ],
    });

    const exists =
      entityFound && entityFound.getId() !== propertyStatus.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(PropertyStatusTranslations.NAME_DUPLICATE)
          : this._i18n.t(PropertyStatusTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updatePropertyStatusDto,
    i18n,
  }: UpdatePropertyStatusCommand): Promise<void> {
    const propertyStatusFound = await this.getPropertyStatus(_id, i18n);

    await this.checkDuplicates(
      propertyStatusFound,
      updatePropertyStatusDto,
      i18n,
    );

    const propertyStatus =
      this.eventPublisher.mergeObjectContext(propertyStatusFound);

    propertyStatus.updatePropertyStatus(
      updatePropertyStatusDto as unknown as IPropertyStatus,
    );

    await this._propertyStatusRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      propertyStatus,
    );

    propertyStatus.commit();
  }
}

import { PropertyTypeTranslations } from "@/property/application/translations";
import { PropertyType } from "@/property/domain/entities";
import { IPropertyType } from "@/property/domain/types";
import { UpdatePropertyTypeDto } from "@/property/infrastructure/dtos";
import { PropertyTypeEntityRepository } from "@/property/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdatePropertyTypeCommand } from "../..";

@CommandHandler(UpdatePropertyTypeCommand)
export class UpdatePropertyTypeCommandHandler
  implements ICommandHandler<UpdatePropertyTypeCommand>
{
  constructor(
    private readonly _propertyTypeRepository: PropertyTypeEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getPropertyType(
    _id: string,
    i18n: I18nContext,
  ): Promise<PropertyType> {
    const propertyType = await this._propertyTypeRepository.findByValue(
      _id,
      "_id",
    );

    if (!propertyType)
      throw new NotFoundException(
        i18n
          ? i18n.t(PropertyTypeTranslations.NOT_FOUND)
          : this._i18n.t(PropertyTypeTranslations.NOT_FOUND),
      );

    return propertyType;
  }

  private async checkDuplicates(
    propertyType: PropertyType,
    updatePropertyTypeDto: UpdatePropertyTypeDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._propertyTypeRepository.findOneEntity({
      $or: [
        { "name.es": updatePropertyTypeDto.name.es },
        { "name.en": updatePropertyTypeDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== propertyType.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(PropertyTypeTranslations.NAME_DUPLICATE)
          : this._i18n.t(PropertyTypeTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updatePropertyTypeDto,
    i18n,
  }: UpdatePropertyTypeCommand): Promise<void> {
    const propertyTypeFound = await this.getPropertyType(_id, i18n);

    await this.checkDuplicates(propertyTypeFound, updatePropertyTypeDto, i18n);

    const propertyType =
      this.eventPublisher.mergeObjectContext(propertyTypeFound);

    propertyType.updatePropertyType(
      updatePropertyTypeDto as unknown as IPropertyType,
    );

    await this._propertyTypeRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      propertyType,
    );

    propertyType.commit();
  }
}

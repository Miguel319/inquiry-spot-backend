import { ColorUpdatedEvent } from "@/common/application/events";
import { ColorTranslations } from "@/common/application/translations";
import { Color } from "@/common/domain/entities";
import { IColor } from "@/common/domain/types";
import { UpdateColorDto } from "@/common/infrastructure/dtos";
import { ColorEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateColorCommand } from "../../operations";

@CommandHandler(UpdateColorCommand)
export class UpdateColorCommandHandler
  implements ICommandHandler<UpdateColorCommand>
{
  constructor(
    private readonly _colorRepository: ColorEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getColor(_id: string, i18n: I18nContext): Promise<Color> {
    const color = await this._colorRepository.findByValue(_id, "_id");

    if (!color)
      throw new NotFoundException(
        i18n
          ? i18n.t(ColorTranslations.NOT_FOUND)
          : this._i18n.t(ColorTranslations.NOT_FOUND),
      );

    return color;
  }

  private async checkDuplicates(
    color: Color,
    updateColorDto: UpdateColorDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._colorRepository.findOneEntity({
      $or: [
        { "name.es": updateColorDto.name.es },
        { "name.en": updateColorDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== color.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(ColorTranslations.NAME_DUPLICATE)
          : this._i18n.t(ColorTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateColorDto,
    i18n,
  }: UpdateColorCommand): Promise<void> {
    const colorFound = await this.getColor(_id, i18n);

    await this.checkDuplicates(colorFound, updateColorDto, i18n);

    const color = this.eventPublisher.mergeObjectContext(colorFound);

    color.updateColor(updateColorDto as unknown as IColor);

    color.apply(new ColorUpdatedEvent(color.getId(), color.getName()));

    await this._colorRepository.findOneAndReplaceByValue(_id, "_id", color);

    color.commit();
  }
}

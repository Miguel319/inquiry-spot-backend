import { TractionTranslations } from "@/vehicle/application/translations";
import { Traction } from "@/vehicle/domain/entities";
import { ITraction } from "@/vehicle/domain/types";
import { UpdateTractionDto } from "@/vehicle/infrastructure/dtos";
import { TractionEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateTractionCommand } from "../../operations";

@CommandHandler(UpdateTractionCommand)
export class UpdateTractionCommandHandler
  implements ICommandHandler<UpdateTractionCommand>
{
  constructor(
    private readonly _tractionRepository: TractionEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getTraction(_id: string, i18n: I18nContext): Promise<Traction> {
    const traction = await this._tractionRepository.findByValue(_id, "_id");

    if (!traction)
      throw new NotFoundException(
        i18n
          ? i18n.t(TractionTranslations.NOT_FOUND)
          : this._i18n.t(TractionTranslations.NOT_FOUND),
      );

    return traction;
  }

  private async checkDuplicates(
    traction: Traction,
    updateTractionDto: UpdateTractionDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._tractionRepository.findOneEntity({
      $or: [
        { "name.es": updateTractionDto.name.es },
        { "name.en": updateTractionDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== traction.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(TractionTranslations.NAME_DUPLICATE)
          : this._i18n.t(TractionTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateTractionDto,
    i18n,
  }: UpdateTractionCommand): Promise<void> {
    const tractionFound = await this.getTraction(_id, i18n);

    await this.checkDuplicates(tractionFound, updateTractionDto, i18n);

    const traction = this.eventPublisher.mergeObjectContext(tractionFound);

    traction.updateTraction(updateTractionDto as unknown as ITraction);

    await this._tractionRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      traction,
    );

    traction.commit();
  }
}

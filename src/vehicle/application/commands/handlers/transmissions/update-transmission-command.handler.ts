import { TransmissionTranslations } from "@/vehicle/application/translations";
import { Transmission } from "@/vehicle/domain/entities";
import { ITransmission } from "@/vehicle/domain/types";
import { UpdateTransmissionDto } from "@/vehicle/infrastructure/dtos";
import { TransmissionEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateTransmissionCommand } from "../../operations";

@CommandHandler(UpdateTransmissionCommand)
export class UpdateTransmissionCommandHandler
  implements ICommandHandler<UpdateTransmissionCommand>
{
  constructor(
    private readonly _transmissionRepository: TransmissionEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getTransmission(
    _id: string,
    i18n: I18nContext,
  ): Promise<Transmission> {
    const transmission = await this._transmissionRepository.findByValue(
      _id,
      "_id",
    );

    if (!transmission)
      throw new NotFoundException(
        i18n
          ? i18n.t(TransmissionTranslations.NOT_FOUND)
          : this._i18n.t(TransmissionTranslations.NOT_FOUND),
      );

    return transmission;
  }

  private async checkDuplicates(
    transmission: Transmission,
    updateTransmissionDto: UpdateTransmissionDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._transmissionRepository.findOneEntity({
      $or: [
        { "name.es": updateTransmissionDto.name.es },
        { "name.en": updateTransmissionDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== transmission.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(TransmissionTranslations.NAME_DUPLICATE)
          : this._i18n.t(TransmissionTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateTransmissionDto,
    i18n,
  }: UpdateTransmissionCommand): Promise<void> {
    const transmissionFound = await this.getTransmission(_id, i18n);

    await this.checkDuplicates(transmissionFound, updateTransmissionDto, i18n);

    const transmission =
      this.eventPublisher.mergeObjectContext(transmissionFound);

    transmission.updateTransmission(
      updateTransmissionDto as unknown as ITransmission,
    );

    await this._transmissionRepository.findOneAndReplaceByValue(
      _id,
      "_id",
      transmission,
    );

    transmission.commit();
  }
}

import { TransmissionTranslations } from "@/vehicle-post/application/translations";
import { Transmission } from "@/vehicle-post/domain/entities";
import { ITransmission } from "@/vehicle-post/domain/types";
import { TransmissionEntityRepository } from "@/vehicle-post/infrastructure/persistence/repositories/transmissions";
import { NotFoundException } from "@nestjs/common";
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

  async execute({
    _id,
    updateTransmissionDto,
    i18n,
  }: UpdateTransmissionCommand): Promise<void> {
    const transmissionFound = await this.getTransmission(_id, i18n);

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

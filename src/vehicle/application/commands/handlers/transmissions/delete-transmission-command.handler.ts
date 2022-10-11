import { TransmissionTranslations } from "@/vehicle/application/translations";
import { Transmission } from "@/vehicle/domain/entities";
import {
  TransmissionEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteTransmissionCommand } from "../..";

@CommandHandler(DeleteTransmissionCommand)
export class DeleteTransmissionCommandHandler
  implements ICommandHandler<DeleteTransmissionCommand>
{
  constructor(
    private readonly _transmissionEntityRepository: TransmissionEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getTransmission(
    _id: string,
    i18n: I18nContext,
  ): Promise<Transmission> {
    const transmission = await this._transmissionEntityRepository.findByValue(
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

  private async handleAuthorization(
    transmission: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._vehiclePostRepository.findOne({
      "transmission._id": transmission,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(TransmissionTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(TransmissionTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteTransmissionCommand): Promise<boolean> {
    const transmissionFound = await this.getTransmission(_id, i18n);

    await this.handleAuthorization(transmissionFound.getId(), i18n);

    const transmission =
      this.eventPublisher.mergeObjectContext(transmissionFound);

    const deleteCount = await this._transmissionEntityRepository.delete(
      _id,
      "_id",
    );

    transmission.commit();

    return deleteCount;
  }
}

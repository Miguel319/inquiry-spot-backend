import { TractionTranslations } from "@/vehicle-post/application/translations";
import { Traction } from "@/vehicle-post/domain/entities";
import {
  TractionEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle-post/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteTractionCommand } from "../..";

@CommandHandler(DeleteTractionCommand)
export class DeleteTractionCommandHandler
  implements ICommandHandler<DeleteTractionCommand>
{
  constructor(
    private readonly _tractionEntityRepository: TractionEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getTraction(_id: string, i18n: I18nContext): Promise<Traction> {
    const traction = await this._tractionEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!traction)
      throw new NotFoundException(
        i18n
          ? i18n.t(TractionTranslations.NOT_FOUND)
          : this._i18n.t(TractionTranslations.NOT_FOUND),
      );

    return traction;
  }

  async handleAuthorization(
    type: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._vehiclePostRepository.findOne({
      type,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(TractionTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(TractionTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteTractionCommand): Promise<boolean> {
    const tractionFound = await this.getTraction(_id, i18n);

    await this.handleAuthorization(tractionFound.getId(), i18n);

    const traction = this.eventPublisher.mergeObjectContext(tractionFound);

    const deleteCount = await this._tractionEntityRepository.delete(_id, "_id");

    traction.commit();

    return deleteCount;
  }
}

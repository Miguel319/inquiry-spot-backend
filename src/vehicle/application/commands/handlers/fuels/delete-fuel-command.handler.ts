import { FuelTranslations } from "@/vehicle/application/translations";
import { Fuel } from "@/vehicle/domain/entities";
import {
  FuelEntityRepository,
  VehiclePostsRepository,
} from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteFuelCommand } from "../..";

@CommandHandler(DeleteFuelCommand)
export class DeleteFuelCommandHandler
  implements ICommandHandler<DeleteFuelCommand>
{
  constructor(
    private readonly _fuelEntityRepository: FuelEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getFuel(_id: string, i18n: I18nContext): Promise<Fuel> {
    const fuel = await this._fuelEntityRepository.findByValue(_id, "_id");

    if (!fuel)
      throw new NotFoundException(
        i18n
          ? i18n.t(FuelTranslations.NOT_FOUND)
          : this._i18n.t(FuelTranslations.NOT_FOUND),
      );

    return fuel;
  }

  private async handleAuthorization(
    type: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const postFound = await this._vehiclePostRepository.findOne({
      type,
    });

    if (postFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(FuelTranslations.FORBIDDEN_DELETION)
          : this._i18n.t(FuelTranslations.FORBIDDEN_DELETION),
      );
  }

  async execute({ _id, i18n }: DeleteFuelCommand): Promise<boolean> {
    const fuelFound = await this.getFuel(_id, i18n);

    await this.handleAuthorization(fuelFound.getId(), i18n);

    const fuel = this.eventPublisher.mergeObjectContext(fuelFound);

    const deleteCount = await this._fuelEntityRepository.delete(_id, "_id");

    fuel.commit();

    return deleteCount;
  }
}

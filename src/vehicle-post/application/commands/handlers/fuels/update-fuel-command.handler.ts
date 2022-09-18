import { FuelTranslations } from "@/vehicle-post/application/translations";
import { Fuel } from "@/vehicle-post/domain/entities";
import { IFuel } from "@/vehicle-post/domain/types";
import { FuelEntityRepository } from "@/vehicle-post/infrastructure/persistence/repositories";
import { NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { UpdateFuelCommand } from "../../operations";

@CommandHandler(UpdateFuelCommand)
export class UpdateFuelCommandHandler
  implements ICommandHandler<UpdateFuelCommand>
{
  constructor(
    private readonly _fuelRepository: FuelEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _i18n: I18nService,
  ) {}

  private async getFuel(_id: string, i18n: I18nContext): Promise<Fuel> {
    const fuel = await this._fuelRepository.findByValue(_id, "_id");

    if (!fuel)
      throw new NotFoundException(
        i18n
          ? i18n.t(FuelTranslations.NOT_FOUND)
          : this._i18n.t(FuelTranslations.NOT_FOUND),
      );

    return fuel;
  }

  async execute({
    _id,
    updateFuelDto,
    i18n,
  }: UpdateFuelCommand): Promise<void> {
    const fuelFound = await this.getFuel(_id, i18n);

    const fuel = this.eventPublisher.mergeObjectContext(fuelFound);

    fuel.updateFuel(updateFuelDto as unknown as IFuel);

    await this._fuelRepository.findOneAndReplaceByValue(_id, "_id", fuel);

    fuel.commit();
  }
}

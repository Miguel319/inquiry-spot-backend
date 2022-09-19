import { FuelTranslations } from "@/vehicle/application/translations";
import { Fuel } from "@/vehicle/domain/entities";
import { IFuel } from "@/vehicle/domain/types";
import { UpdateFuelDto } from "@/vehicle/infrastructure/dtos";
import { FuelEntityRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
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

  private async checkDuplicates(
    fuel: Fuel,
    updateFuelDto: UpdateFuelDto,
    i18n: I18nContext,
  ): Promise<never | void> {
    const entityFound = await this._fuelRepository.findOneEntity({
      $or: [
        { "name.es": updateFuelDto.name.es },
        { "name.en": updateFuelDto.name.en },
      ],
    });

    const exists = entityFound && entityFound.getId() !== fuel.getId();

    if (exists)
      throw new BadRequestException(
        i18n
          ? i18n.t(FuelTranslations.NAME_DUPLICATE)
          : this._i18n.t(FuelTranslations.NAME_DUPLICATE),
      );
  }

  async execute({
    _id,
    updateFuelDto,
    i18n,
  }: UpdateFuelCommand): Promise<void> {
    const fuelFound = await this.getFuel(_id, i18n);

    await this.checkDuplicates(fuelFound, updateFuelDto, i18n);

    const fuel = this.eventPublisher.mergeObjectContext(fuelFound);

    fuel.updateFuel(updateFuelDto as unknown as IFuel);

    await this._fuelRepository.findOneAndReplaceByValue(_id, "_id", fuel);

    fuel.commit();
  }
}

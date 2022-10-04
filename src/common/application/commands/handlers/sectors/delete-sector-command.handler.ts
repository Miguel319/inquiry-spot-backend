import {
  SectorTranslations,
  MunicipalityTranslations,
} from "@/common/application/translations";
import { Sector } from "@/common/domain/entities";
import {
  SectorEntityRepository,
  MunicipalityEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteSectorCommand } from "../..";

@CommandHandler(DeleteSectorCommand)
export class DeleteSectorCommandHandler
  implements ICommandHandler<DeleteSectorCommand>
{
  constructor(
    private readonly _sectorEntityRepository: SectorEntityRepository,
    private readonly _municipalityEntityRepository: MunicipalityEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getSector(_id: string, i18n: I18nContext): Promise<Sector> {
    const sector = await this._sectorEntityRepository.findByValue(_id, "_id");

    if (!sector)
      throw new NotFoundException(
        i18n
          ? i18n.t(SectorTranslations.NOT_FOUND)
          : this._i18n.t(SectorTranslations.NOT_FOUND),
      );

    return sector;
  }

  private async checkVehiclePostDependency(
    sectorId: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const vehiclePostFound = await this._vehiclePostRepository.findOne({
      "address.sector._id": sectorId,
    });

    if (vehiclePostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(SectorTranslations.FORBIDDEN_DELETION_VEHICLE)
          : this._i18n.t(SectorTranslations.FORBIDDEN_DELETION_VEHICLE),
      );
  }

  private async checkPropertyPostDependency(
    sectorId: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const propertyPostFound = await this._propertyPostRepository.findOne({
      "address.sector._id": sectorId,
    });

    if (propertyPostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(SectorTranslations.FORBIDDEN_DELETION_PROPERTY)
          : this._i18n.t(SectorTranslations.FORBIDDEN_DELETION_PROPERTY),
      );
  }

  private async removeMunicipalityDependencies(
    sector: Sector,
    i18n: I18nContext,
  ): Promise<void> {
    const municipality = await this._municipalityEntityRepository.findByValue(
      sector.getMunicipality()._id,
      "_id",
    );

    if (!municipality)
      throw new NotFoundException(
        i18n
          ? i18n.t(MunicipalityTranslations.NOT_FOUND)
          : this._i18n.t(MunicipalityTranslations.NOT_FOUND),
      );

    municipality.removeSector(new Types.ObjectId(sector.getId()));

    await this._propertyPostRepository.findOneAndUpdate(
      {
        _id: municipality.getId(),
      },
      municipality,
    );

    municipality.commit();
  }

  async execute({ _id, i18n }: DeleteSectorCommand): Promise<boolean> {
    const sectorFound = await this.getSector(_id, i18n);

    await this.checkVehiclePostDependency(sectorFound.getId(), i18n);
    await this.checkPropertyPostDependency(sectorFound.getId(), i18n);
    await this.removeMunicipalityDependencies(sectorFound, i18n);

    const sector = this.eventPublisher.mergeObjectContext(sectorFound);

    const deleteCount = await this._sectorEntityRepository.delete(_id, "_id");

    sector.commit();

    return deleteCount;
  }
}

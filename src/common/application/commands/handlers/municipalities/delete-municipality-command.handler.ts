import {
  MunicipalityTranslations,
  ProvinceTranslations,
} from "@/common/application/translations";
import { Municipality } from "@/common/domain/entities";
import {
  MunicipalityEntityRepository,
  ProvinceEntityRepository,
} from "@/common/infrastructure/persistence/repositories";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteMunicipalityCommand } from "../..";

@CommandHandler(DeleteMunicipalityCommand)
export class DeleteMunicipalityCommandHandler
  implements ICommandHandler<DeleteMunicipalityCommand>
{
  constructor(
    private readonly _municipalityEntityRepository: MunicipalityEntityRepository,
    private readonly _provinceEntityRepository: ProvinceEntityRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly _vehiclePostRepository: VehiclePostsRepository,
    private readonly _propertyPostRepository: PropertyPostsRepository,
    private readonly _i18n: I18nService,
  ) {}

  private async getMunicipality(
    _id: string,
    i18n: I18nContext,
  ): Promise<Municipality> {
    const municipality = await this._municipalityEntityRepository.findByValue(
      _id,
      "_id",
    );

    if (!municipality)
      throw new NotFoundException(
        i18n
          ? i18n.t(MunicipalityTranslations.NOT_FOUND)
          : this._i18n.t(MunicipalityTranslations.NOT_FOUND),
      );

    return municipality;
  }

  private async checkVehiclePostDependency(
    municipalityId: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const vehiclePostFound = await this._vehiclePostRepository.findOne({
      "address.municipality._id": municipalityId,
    });

    if (vehiclePostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_VEHICLE)
          : this._i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_VEHICLE),
      );
  }

  private async checkPropertyPostDependency(
    municipalityId: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const propertyPostFound = await this._propertyPostRepository.findOne({
      "address.municipality._id": municipalityId,
    });

    if (propertyPostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_PROPERTY)
          : this._i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_PROPERTY),
      );
  }

  private async removeProvinceDependencies(
    municipality: Municipality,
    i18n: I18nContext,
  ): Promise<void> {
    const province = await this._provinceEntityRepository.findByValue(
      municipality.getProvince()._id,
      "_id",
    );

    if (!province)
      throw new NotFoundException(
        i18n
          ? i18n.t(ProvinceTranslations.NOT_FOUND)
          : this._i18n.t(ProvinceTranslations.NOT_FOUND),
      );

    province.removeMunicipality(new Types.ObjectId(municipality.getId()));

    await this._propertyPostRepository.findOneAndUpdate(
      {
        _id: province.getId(),
      },
      province,
    );

    province.commit();
  }

  async execute({ _id, i18n }: DeleteMunicipalityCommand): Promise<boolean> {
    const municipalityFound = await this.getMunicipality(_id, i18n);

    await this.checkVehiclePostDependency(municipalityFound.getId(), i18n);
    await this.checkPropertyPostDependency(municipalityFound.getId(), i18n);
    await this.removeProvinceDependencies(municipalityFound, i18n);

    const municipality =
      this.eventPublisher.mergeObjectContext(municipalityFound);

    const deleteCount = await this._municipalityEntityRepository.delete(
      _id,
      "_id",
    );

    municipality.commit();

    return deleteCount;
  }
}

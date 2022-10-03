import { MunicipalityTranslations } from "@/common/application/translations";
import { Municipality } from "@/common/domain/entities";
import { MunicipalityEntityRepository } from "@/common/infrastructure/persistence/repositories";
import { PropertyPostsRepository } from "@/real-state/infrastructure/persistence/repositories";
import { VehiclePostsRepository } from "@/vehicle/infrastructure/persistence/repositories";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { I18nContext, I18nService } from "nestjs-i18n";
import { DeleteMunicipalityCommand } from "../..";

@CommandHandler(DeleteMunicipalityCommand)
export class DeleteMunicipalityCommandHandler
  implements ICommandHandler<DeleteMunicipalityCommand>
{
  constructor(
    private readonly _municipalityEntityRepository: MunicipalityEntityRepository,
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

  private async handleAuthorization(
    municipality: string,
    i18n: I18nContext,
  ): Promise<never | void> {
    const vehiclePostFound = await this._vehiclePostRepository.findOne({
      "municipality._id": municipality,
    });

    if (vehiclePostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_VEHICLE)
          : this._i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_VEHICLE),
      );

    const propertyPostFound = await this._propertyPostRepository.findOne({
      "municipality._id": municipality,
    });

    if (propertyPostFound)
      throw new ForbiddenException(
        i18n
          ? i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_PROPERTY)
          : this._i18n.t(MunicipalityTranslations.FORBIDDEN_DELETION_PROPERTY),
      );
  }

  async execute({ _id, i18n }: DeleteMunicipalityCommand): Promise<boolean> {
    const municipalityFound = await this.getMunicipality(_id, i18n);

    await this.handleAuthorization(municipalityFound.getId(), i18n);

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
